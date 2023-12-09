import { Component } from '@angular/core';
import { AuthService } from './core/services/api/strapi/auth.service';
import { Router } from '@angular/router';
import { User } from './core/interfaces/user';
import { CustomTranslateService } from './core/services/custom-translate.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  primera: boolean = true;
  lang: string = "es";
  user: User | undefined
  constructor(
    public auth: AuthService,
    private rotuer: Router,
    public translate: CustomTranslateService
  ) {
    this.auth.isLogged$.subscribe(logged => {
      if(logged){
        this.rotuer.navigate(['/home']);
        this.auth.me().subscribe(_ => {
          console.log("Usuario logeado"+_.username)
          this.user = _
          this.primera = false
        })
      } else
        this.rotuer.navigate(['/login'])
        this.primera = true
    });
    this.translate.use(this.lang)
  }
  
  onLang(){
    if(this.lang=='es')
      this.lang='en';
    else
      this.lang='es';
    this.translate.use(this.lang);
    return false;    
  }

  onSingOut(){
    this.auth.logOut().subscribe(_=>{
      this.rotuer.navigate(['/login']);
      this.user = undefined;
    })
  }
}
