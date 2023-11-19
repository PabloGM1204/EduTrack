import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, tap } from 'rxjs';
import { UserCredentials } from '../../../interfaces/user-credentials';
import { UserRegisterInfo } from '../../../interfaces/user-register-info';
import { JwtService } from '../../jwt.service';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export abstract class AuthService {
  
  // Observables que me van a indicar si el usuario se ha logeado o no
  // es de tipo booleano ya que si es verdadero dara el paso a la siguiente página, ademas lo tenemos en falso por defecto por seguridad
  protected _logged = new BehaviorSubject<boolean>(false);
  public isLogged$ = this._logged.asObservable();

  public abstract login(credentials: Object): Observable<any>;

  public abstract register(info: Object): Observable<any>;

  public abstract logOut(): void;

  public abstract me(): Observable<any>;
}