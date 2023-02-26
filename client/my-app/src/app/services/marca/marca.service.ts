import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';

@Injectable({
    providedIn: "root"
})

export class MarcaService {
   
    
    constructor(public http: HttpClient) {}

      getAllMarcas(page: number = 1) {
        const URL = `${environment.apiUrl}/api/marcas/list?page=${page}`;
        return this.http.get(URL).pipe(map( (resp: any) => resp));
      }

      findMarca(name: string) {
        const URL = `${environment.apiUrl}/api/marcas/find/marca/${name}`;
        return this.http.get(URL).pipe(map( (resp: any) => resp));
      }

      createMarca(name: string) {
        const URL = `${environment.apiUrl}/api/marcas/create`;
        return this.http.post(URL, {name: name}).pipe(map( (resp: any) => resp));
      }

      updateMarca(id: number, name: string) {
        const URL = `${environment.apiUrl}/api/marcas/update/marca/${id}`;
        return this.http.put(URL, {name: name}).pipe(map( (resp: any) => resp));
      }

      deleteMarca(id: number) {
        const URL = `${environment.apiUrl}/api/marcas/delete/marca/${id}`;
        return this.http.delete(URL).pipe(map( (resp: any) => resp));
      }
   
   
}