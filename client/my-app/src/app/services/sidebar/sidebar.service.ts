import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})

export class SidebarService {
    menu: any = [
        {
            titulo: "Principal",
            icono: "mdi mdi-gauge",
            submenu: [
                { titulo: "Dashboard", url: "/dashboard" }
            ]
        },
        {
            titulo: "Mantenimiento",
            icono: "mdi mdi-gauge",
            submenu: [
                { titulo: "Autos", url: "autos" },
                { titulo: "Marcas", url: "marcas" },
                { titulo: "Colores", url: "colores" }
            ]
        }
    ];
    constructor() {}
    cargarMenu() {
        return this.menu;
    }
}