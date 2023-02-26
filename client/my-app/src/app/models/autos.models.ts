
export class Autos {
    constructor(
        public identificacion: string,
        public marca: { _id: number, name: string },
        public modelo: number,
        public color: { _id: number, name: string },
        public date: Date,
        public estado: boolean,
        public asignado: boolean,
        public _id?: number
    ) { }
   
}