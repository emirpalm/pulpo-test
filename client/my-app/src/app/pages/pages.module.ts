import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AutosComponent } from './mantenimientos/autos/autos.component';
import { MarcasComponent } from './mantenimientos/marcas/marcas.component';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { ColoresComponent } from './mantenimientos/colores/colores.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DashboardComponent,
    AutosComponent,
    MarcasComponent,
    PagesComponent,
    ColoresComponent,
    BusquedaComponent,
  ],
  exports: [
    DashboardComponent, 
    AutosComponent, 
    MarcasComponent,
    PagesComponent,
    ColoresComponent,
    BusquedaComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PagesModule { }
