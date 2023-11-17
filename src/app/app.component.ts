import { Component } from '@angular/core';
import { AuthService } from './core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  constructor(
    private auth: AuthService,
    private rotuer: Router
  ) {
    this.auth.isLogged$.subscribe(logged => {
      if(logged)
        this.rotuer.navigate(['/home']);
      else
        this.rotuer.navigate(['/login'])
    });
  }
}
