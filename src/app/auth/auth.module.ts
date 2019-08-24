import { NgModule } from '@angular/core';
import { RequestOptions, HttpClient } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';

export function authHttpServiceFactory(http: HttpClient, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    tokenName: 'token',
    tokenGetter: (() => localStorage.getItem('token')),
    globalHeaders: [{'Content-Type': 'application/json'}],
  }), http, options);
}

@NgModule({
 providers: [
   {
     provide: AuthHttp,
     useFactory: authHttpServiceFactory,
     deps: [HttpClient, RequestOptions]
   }
 ]
})
export class AuthModule { }
