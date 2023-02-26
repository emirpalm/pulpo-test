import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: "root"
})

export class AutoService {
   
    
    constructor(public http: HttpClient) {}

      getAllAutos(page: number = 1) {
        const URL = `${environment.apiUrl}/api/autos/list?page=${page}`;
        return this.http.get(URL).pipe(map( (resp: any) => resp));
      }

      findAuto(nombre: string) {
        const URL = `${environment.apiUrl}/api/autos/find/auto/${nombre}`;
        return this.http.get(URL).pipe(map( (resp: any) => resp));
      }

      createAuto(data: any) {
        const URL = `${environment.apiUrl}/api/autos/create`;
        return this.http.post(URL, {data}).pipe(map( (resp: any) => resp));
      }

      updateAuto(id: number, identificacion: string, marca: number, modelo: number, color: number, date: Date, estado: boolean, asignado: boolean) {
        const URL = `${environment.apiUrl}/api/autos/update/auto/${id}`;
        return this.http.put(URL, {identificacion: identificacion, marca: marca, modelo: modelo, color: color, date: date, estado: estado, asignado: asignado}).pipe(map( (resp: any) => resp));
      }

      deleteAuto(id: number) {
        const URL = `${environment.apiUrl}/api/autos/delete/auto/${id}`;
        return this.http.delete(URL).pipe(map( (resp: any) => resp));
      }
   
   
}