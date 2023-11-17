import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { JwtService } from './jwt.service';
import { ApiService } from './api.service';
import { UserCredentials } from '../interfaces/user-credentials';
import { Observable, lastValueFrom, map } from 'rxjs';
import { StrapiExtendedUser, StrapiLoginPayload, StrapiLoginResponse, StrapiRegisterPayLoad, StrapiRegisterResponse } from '../interfaces/strapi';
import { UserRegisterInfo } from '../interfaces/user-register-info';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthStrapiService extends AuthService {

  constructor(
    private jwtSvc: JwtService,
    private apiSvc: ApiService
  ) {
    super();
    this.init();
  }

  // Al iniciar el servicio le decimos que cargue el token
  private init(){
    this.jwtSvc.loadToken().subscribe(_=>{
      this._logged.next(true);
    })
  }

  // Método para hacer el login
  // Le paso las credenciales con los datos necesarios y se los pasa al strapi y recibimos el jwt en caso de que sea correcto
  public login(credentials: UserCredentials): Observable<void>{
    return new Observable<void>(obs => {
      const _credentials: StrapiLoginPayload = {
        identifier: credentials.username,
        password: credentials.password
      }
      this.apiSvc.post("/auth/local", _credentials).subscribe({
        next:async (data:StrapiLoginResponse) => {
          await lastValueFrom(this.jwtSvc.saveToken(data.jwt));
          this._logged.next(data && data.jwt != '');
          obs.next();
          obs.complete();
        },
        error: err => {
          obs.error(err);
        }
      });
    });
  }

  // Método para salirme de la cuenta
  // Le pido al servicio que me destruya el token(el lo pone a vacio)
  public logOut(): Observable<void>{
    return this.jwtSvc.destroyToken().pipe(map(_=> {
      this._logged.next(false);
      return;
    }));
  }

  // Método para registrarse
  // Lo que hace es coger la info que ponemos en el formulario y pasarla a la tabla de extender_user, se lo pasamos al strapi y le decimos a la variable de log que se ha logeado
  public register(info: UserRegisterInfo): Observable<void> {
    return new Observable<void>(obs => {
      const _info: StrapiRegisterPayLoad = {
        email: info.email,
        password: info.password,
        username: info.nickname
      }
      this.apiSvc.post("auth/local/register", info).subscribe({
        next:async (data:StrapiRegisterResponse) => {
          let connected = data && data.jwt != "";
          this._logged.next(connected);
          await lastValueFrom(this.jwtSvc.saveToken(data.jwt));
          const _extended_user: StrapiExtendedUser = {
            name: info.name,
            surname: info.surname,
            user_id: data.user.id
          }
          await lastValueFrom(this.apiSvc.post("/extended_user", _extended_user)).catch;
          obs.next();
          obs.complete();
        },
        error: err => {
          obs.next(err)
        }
      })
    })
  }

  // Método para poder recoger los datos del usuario que ha iniciado sesion
  public me(): Observable<User> {
    return new Observable<User>(obs => {
      this.apiSvc.get('/user/me').subscribe({
        next:async (user: User) => {
          let extended_user = await lastValueFrom(this.apiSvc.get(`/extended-users?filters[user_id]=${user.id}`));
          let ret: User = {
            id: user.id,
            name: user.name,
            surname: user.surname
          }
          obs.next(ret);
          obs.complete();
        },
        error: err => {
          obs.error(err);
        }
      })
    })
  }
}
