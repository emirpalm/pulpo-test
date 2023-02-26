import { Component, OnInit } from '@angular/core';
import { Colores } from '../../../models/colores.models';
import { ColorService, BusquedasService } from '../../../services/service.index';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-colores',
  templateUrl: './colores.component.html',
  styleUrls: ['./colores.component.css']
})
export class ColoresComponent implements OnInit {

  public colores: Colores[] = [];
  public cargando: boolean = true;
  public total: number = 0;
  public page: number = 1;

  constructor(private coloresService: ColorService, private busquedaService: BusquedasService) { }

  ngOnInit(): void {

    this.cargarColores();
  }

  searchColor(termino: string) {
    if(termino.length === 0) {
      return this.cargarColores();
    }
    this.busquedaService.buscar('colores', termino)
    .subscribe( (resp: any) => {
      this.colores = resp;
    } );
  }

  cargarColores(page: number = 1) {
    this.cargando = true;
    this.coloresService.getAllColores(page)
    .subscribe( (resp: any) => {
      this.colores = resp.rows;
      this.total = resp.count;
      this.cargando = false;
    } );
  }

  updatedColor(color: Colores) {
    const id: number = color._id!;
    const name: string = color.name!;
    this.coloresService.updateColor(id, name)
    .subscribe( (resp: any) => {
      this.cargarColores();
      Swal.fire({
        title: 'Actualizado!',
        text: color.name,
        icon: 'success',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      })
    });
    
  }


  deleteColor(color: Colores) {
    const id: number = color._id!;
    this.coloresService.deleteColor(id)
    .subscribe( (resp: any) => {
      this.cargarColores();
      Swal.fire({
        title: 'Borrado!',
        text: color.name,
        icon: 'success',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      })
    });
    
  }

  openModalCreateColor() {
    Swal.fire({
      title: 'Crear Color',
      html: `<input type="text" id="nameColor" class="swal2-input" placeholder="Nombre del color">`,
      confirmButtonText: 'Guardar',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      focusConfirm: false,
      preConfirm: () => {
        const name: string = (<HTMLInputElement>document.getElementById("nameColor")).value
        if (!name) {
          Swal.showValidationMessage(`Porfavor, debes ingresar un nombre`)
        }
    return { name: name }
  }
}).then((result) => {
  if (result.isConfirmed == true) {
    const name: string = result.value?.name !== undefined ? result.value?.name : '';
    this.coloresService.createColor(name)
    .subscribe( (resp: any) => {
      this.cargarColores();
    } );
    Swal.fire({
      title: 'Creado!',
      text: 'El color ha sido creada con éxito',
      icon: 'success',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
    })
  }
});
  }

  changePage(value: number) {
    this.page += value;
    const limit = Math.ceil(this.total/5);
    console.log(limit);
    if(this.page < 1) {
      this.page = 1;
    } else if (this.page > limit) {
      this.page -= value;
    }
    this.cargarColores(this.page);
  }

}
