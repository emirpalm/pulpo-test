import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule  } from '@angular/common/http';

import {
    SidebarService,
    ColorService,
    MarcaService,
    AutoService,
    BusquedasService,
    UsuarioService,
    AuthGuard,
    LoginGuard,
    VerificaTokenGuard,
    RefreshTokenInterceptor
   } from './service.index';


@NgModule({
    imports: [
        CommonModule,
        HttpClientModule
    ],
    providers: [
        SidebarService,
        ColorService,
        MarcaService,
        AutoService,
        BusquedasService,
        UsuarioService,
        AuthGuard,
        LoginGuard,
        VerificaTokenGuard,
        RefreshTokenInterceptor
    ],
    declarations: []
  })

  export class ServiceModule { }
