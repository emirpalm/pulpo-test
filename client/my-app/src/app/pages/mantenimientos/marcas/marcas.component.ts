import { Component, OnInit } from '@angular/core';
import { Marcas } from '../../../models/marcas.models';
import { MarcaService, BusquedasService } from '../../../services/service.index';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-marcas',
  templateUrl: './marcas.component.html',
  styleUrls: ['./marcas.component.css']
})
export class MarcasComponent implements OnInit {

  public marcas: Marcas[] = [];
  public cargando: boolean = true;
  public total: number = 0;
  public page: number = 1;

  constructor(private marcasService: MarcaService, private busquedaService: BusquedasService) { }

  ngOnInit(): void {
    this.cargarMarcas();
  }

  searchMarca(termino: string) {
    if(termino.length === 0) {
      return this.cargarMarcas();
    }
    this.busquedaService.buscar('marcas', termino)
    .subscribe( (resp: any) => {
      console.log(resp);
      this.marcas = resp;
    } );
  }

  cargarMarcas(page: number = 1) {
    this.cargando = true;
    this.marcasService.getAllMarcas(page)
    .subscribe( (resp: any) => {
      this.marcas = resp.rows;
      this.total = resp.count;
      this.cargando = false;
    } );
  }

  updatedMarca(marca: Marcas) {
    const id: number = marca._id!;
    const name: string = marca.name!;
    this.marcasService.updateMarca(id, name)
    .subscribe( (resp: any) => {
      this.cargarMarcas();
      Swal.fire({
        title: 'Actualizado!',
        text: marca.name,
        icon: 'success',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      })
    });
    
  }


  deleteMarca(marca: Marcas) {
    const id: number = marca._id!;
    this.marcasService.deleteMarca(id)
    .subscribe( (resp: any) => {
      this.cargarMarcas();
      Swal.fire({
        title: 'Borrado!',
        text: marca.name,
        icon: 'success',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      })
    });
    
  }

  openModalCreateMarca() {
    Swal.fire({
      title: 'Crear Marca',
      html: `<input type="text" id="nameMarca" class="swal2-input" placeholder="Nombre de la marca">`,
      confirmButtonText: 'Guardar',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      focusConfirm: false,
      preConfirm: () => {
        const name: string = (<HTMLInputElement>document.getElementById("nameMarca")).value
        if (!name) {
          Swal.showValidationMessage(`Porfavor, debes ingresar un nombre`)
        }
    return { name: name }
  }
}).then((result) => {
  if (result.isConfirmed == true) {
    const name: string = result.value?.name !== undefined ? result.value?.name : '';
    this.marcasService.createMarca(name)
    .subscribe( (resp: any) => {
      this.cargarMarcas();
    } );
    Swal.fire({
      title: 'Creado!',
      text: 'La marca ha sido creada con éxito',
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
    this.cargarMarcas(this.page);
  }

}
