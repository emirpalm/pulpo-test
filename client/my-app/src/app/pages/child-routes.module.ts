import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';

//mantenimientos
import { AutosComponent } from './mantenimientos/autos/autos.component';
import { ColoresComponent } from './mantenimientos/colores/colores.component';
import { MarcasComponent } from './mantenimientos/marcas/marcas.component';
import { BusquedaComponent } from './busqueda/busqueda.component';


const childRoutes: Routes = [
    { path: '', component: DashboardComponent, data: { titulo: 'Dashboard' } },
    { path: 'buscar/:termino', component: BusquedaComponent, data: { titulo: 'Busquedas' }},
  
    // Mantenimientos
    { path: 'autos', component: AutosComponent,data: { titulo: 'Autos' } },
    { path: 'marcas', component: MarcasComponent, data: { titulo: 'Marcas' } },
    { path: 'colores', component: ColoresComponent, data: { titulo: 'Colores' } }
  ]
  


  @NgModule({
    imports: [ RouterModule.forChild(childRoutes) ],
    exports: [ RouterModule ]
  })
  export class ChildRoutesModule { }
  
