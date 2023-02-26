import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Usuarios } from '../../models/usuarios.models';

import { environment } from '../../../environments/environment';



import { RegisterForm } from '../../interfaces/register-form.interface';
import { LoginForm } from '../../interfaces/login-form.interface';

const base_url = environment.apiUrl;

declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  messages: string[] = [];
  token: string = '';

  constructor( private http: HttpClient, 
                private router: Router) {
                
  }

  estaLogueado() {
    return (this.token.length > 5 ) ? true : false;

  }

  public getToken(): string {
    return localStorage.getItem('token')!;
  }



  logout() {
    localStorage.removeItem('token');

    this.router.navigate(['/login']);

  }

  validarToken(){
    const token = localStorage.getItem('token') || '';
    return (token.length > 5 ) ? true : false;

  }


  crearUsuario( formData: RegisterForm ) {
    
    return this.http.post(`${ base_url }/api/user/register`, formData )
              .pipe(
                tap( (resp: any) => {
                  localStorage.setItem('token', resp.token )
                })
              )

  }

  login( formData: LoginForm ) {
    
    return this.http.post(`${ base_url }/api/user/login`, formData )
                .pipe(
                  tap( (resp: any) => {
                    localStorage.setItem('token', resp.data.token )
                  })
                );

  }

}
