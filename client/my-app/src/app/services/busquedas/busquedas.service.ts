import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';

import { Colores } from '../../models/colores.models';
import { Marcas } from '../../models/marcas.models';
import { Autos } from '../../models/autos.models';

const base_url = environment.apiUrl;


@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

  constructor( private http: HttpClient ) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  

  private transformaColores( resultados: any[] ): Colores[]  {
    return resultados;
   
  }


  private transformarMarcas( resultados: any[] ): Marcas[]  {
    return resultados;
   
  }

  private transformarAutos( resultados: any[] ): Autos[]  {
    return resultados;
   
  }

  busquedaGlobal( termino: string ) {

    const url = `${ base_url }/api/all/search/${ termino }`;
    return this.http.get(url);

  }


 
  buscar( 
      tipo: 'colores'|'marcas'|'autos',
      termino: string
    ) {

    const url = `${ base_url }/api/${ tipo }/find/${ termino }`;
    return this.http.get<any[]>( url )
            .pipe(
              map( (resp: any ) => { 

                switch ( tipo ) {
                  case 'colores':
                    return this.transformaColores( resp.colores );
                  case 'marcas':
                    return this.transformarMarcas( resp.marcas );
                  case 'autos':
                    return this.transformarAutos( resp.autos );
                
                  default:
                    return [];
                }

              })
            );

  }


}
