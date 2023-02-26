import { Component, OnInit } from '@angular/core';


import { Autos } from '../../../models/autos.models';
import { Colores } from '../../../models/colores.models';
import { Marcas } from '../../../models/marcas.models';
import { AutoService, ColorService, MarcaService, BusquedasService } from '../../../services/service.index';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

interface auto {
  identificacion: number;
  marca: number;
  modelo: number;
  color: number;
  date: Date;
  estado: boolean;
  asignado: boolean;
}

@Component({
  selector: 'app-autos',
  templateUrl: './autos.component.html',
  styleUrls: ['./autos.component.css']
})
export class AutosComponent implements OnInit {

  public autos: Autos[] = [];
  public colores: Colores[] = [];
  public marcas: Marcas[] = [];
  public cargando: boolean = true;
  public total: number = 0;
  public page: number = 1;

  form: FormGroup;

  constructor(
    private _coloresService: ColorService, 
    private _marcaService: MarcaService, 
    private _autosService: AutoService, 
    private _busquedaService: BusquedasService,
    private fb: FormBuilder,
    private modalService: NgbModal) { 
      this.form = this.fb.group({
        identificacion: ['', Validators.required],
        marca: ['', Validators.required],
        modelo: ['', Validators.required],
        color: ['', Validators.required],
        date: ['', Validators.required],
        estado: [false],
        asignado: [false]
      });
    }

  ngOnInit(): void {
    this.cargarAutos();
    this.form.valueChanges.subscribe(val => console.log(val));
    this.cargarMarcas();
    this.cargarColores();
  }


  cargarMarcas(): void {
    this._marcaService.getAllMarcas()
      .subscribe((resp: any) => {
        this.marcas = resp.rows;
      });
  }

  cargarColores(): void {
    this._coloresService.getAllColores()
      .subscribe((resp: any) => {
        this.colores = resp.rows;
      });
  }

  searchAutos(termino: string) {
    if(termino.length === 0) {
      return this.cargarAutos();
    }
    this._busquedaService.buscar('autos', termino)
    .subscribe( (resp: any) => {
      console.log(resp);
      this.autos = resp;
    } );
  }

  cargarAutos(page: number = 1) {
    this.cargando = true;
    this._autosService.getAllAutos(page)
    .subscribe( (resp: any) => {
      this.autos = resp.rows;
      this.total = resp.count;
      this.cargando = false;
      console.log(this.autos)
    } );
  }

  updatedAuto(auto: Autos) {
    const id: number = auto._id!;
    const identificacion: string = auto.identificacion!;
    const marca: number = auto.marca._id!;
    const modelo: number = auto.modelo;
    const color: number = auto.color._id;
    const date: Date = auto.date;
    const estado: boolean = auto.estado;
    const asignado: boolean = auto.asignado;
    this._autosService.updateAuto(id, identificacion, marca, modelo, color, date, estado, asignado)
    .subscribe( (resp: any) => {
      this.cargarAutos();
      Swal.fire({
        title: 'Actualizado!',
        text: auto.identificacion,
        icon: 'success',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      })
    });
    
  }


  deleteAuto(auto: Autos) {
    const id: number = auto._id!;
    this._autosService.deleteAuto(id)
    .subscribe( (resp: any) => {
      this.cargarAutos();
      Swal.fire({
        title: 'Borrado!',
        text: auto.identificacion,
        icon: 'success',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      })
    });
    
  }

  openModalCreateAuto(content: any) {
    this.modalService.open(content, { backdrop: false });
  }


  changePage(value: number) {
    this.page += value;
    const limit = Math.ceil(this.total/5);
    if(this.page < 1) {
      this.page = 1;
    } else if (this.page > limit) {
      this.page -= value;
    }
    this.cargarAutos(this.page);
  }

  submitForm() {
    console.log(this.form);
    if (this.form.valid) {
      // Enviar formulario
      this._autosService.createAuto(this.form.value).subscribe((resp: any) => {
        this.cargarAutos();
        Swal.fire({
          title: 'Creado!',
          text: 'El auto ha sido creada con éxito',
          icon: 'success',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
        });
        this.form.reset();
      });
    } else {
      Swal.fire('Error', 'Complete los campos.', 'error');
    }
  }
}
