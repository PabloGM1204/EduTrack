import { Component } from '@angular/core';
import { AuthService } from './core/services/api/strapi/auth.service';
import { Router } from '@angular/router';
import { User } from './core/interfaces/user';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  user: User | undefined
  constructor(
    public auth: AuthService,
    private rotuer: Router
  ) {
    this.auth.isLogged$.subscribe(logged => {
      if(logged)
        this.rotuer.navigate(['/home']);
      else
        this.rotuer.navigate(['/login'])
    });
  }

  onSingOut(){
    this.auth.logOut().subscribe(_=>{
      this.rotuer.navigate(['/login']);
      this.user = undefined;
    })
  }
}
