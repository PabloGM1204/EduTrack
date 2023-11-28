import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { IonicModule, IonicRouteStrategy, Platform } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientProvider } from './core/services/http/http-client.provider';
import { HttpClientWebProvider } from './core/services/http/http-client-web.provider';
import { AuthService } from './core/services/api/strapi/auth.service';
import { ApiService } from './core/services/api/api.service';
import { AuthStrapiService } from './core/services/api/strapi/auth-strapi.service';
import { JwtService } from './core/services/jwt.service';
import { SharedModule } from './shared/shared.module';

export function httpProviderFactory(http: HttpClient) {
  return new HttpClientWebProvider(http);
}

export function AuthServiceProvider(jwt: JwtService, api: ApiService) {
  return new AuthStrapiService(jwt, api);
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule, 
    HttpClientModule,
    SharedModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: HttpClientProvider,
      deps: [HttpClient, Platform],
      useFactory: httpProviderFactory,
    },
    {
      provide: AuthService,
      deps: [JwtService, ApiService],
      useFactory: AuthServiceProvider,
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
