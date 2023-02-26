import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BusquedasService } from '../../services/service.index';

//models
import { Autos } from '../../models/autos.models';
import { Marcas } from '../../models/marcas.models';
import { Colores } from '../../models/colores.models';


@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent implements OnInit {

  public autos: Autos[] = [];
  public marcas: Marcas[] = [];
  public colores: Colores[] = [];


  constructor( private activatedRoute: ActivatedRoute,
               private busquedasService: BusquedasService) { }

  ngOnInit(): void {

    this.activatedRoute.params
      .subscribe( ({ termino }) => this.busquedaGlobal( termino ));

  }

  busquedaGlobal( termino: string ) {

    this.busquedasService.busquedaGlobal( termino )
        .subscribe( (resp: any) => {
          console.log(resp)
          this.autos   = resp.autos;
          this.marcas    = resp.marcas;
          this.colores = resp.colores;
        });

  }

}
