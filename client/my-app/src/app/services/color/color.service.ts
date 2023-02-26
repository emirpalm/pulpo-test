import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';

@Injectable({
    providedIn: "root"
})

export class ColorService {
   
    
    constructor(public http: HttpClient) {}

      getAllColores(page: number = 1) {
        const URL = `${environment.apiUrl}/api/colores/list?page=${page}`;
        return this.http.get(URL).pipe(map( (resp: any) => resp));
      }

      findColor(name: string) {
        const URL = `${environment.apiUrl}/api/colores/find/color/${name}`;
        return this.http.get(URL).pipe(map( (resp: any) => resp));
      }

      createColor(name: string) {
        const URL = `${environment.apiUrl}/api/colores/create`;
        return this.http.post(URL, {name: name}).pipe(map( (resp: any) => resp));
      }

      updateColor(id: number, name: string) {
        const URL = `${environment.apiUrl}/api/colores/update/color/${id}`;
        return this.http.put(URL, {name: name}).pipe(map( (resp: any) => resp));
      }

      deleteColor(id: number) {
        const URL = `${environment.apiUrl}/api/colores/delete/color/${id}`;
        return this.http.delete(URL).pipe(map( (resp: any) => resp));
      }
   
   
}