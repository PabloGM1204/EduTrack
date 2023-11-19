import { Alumno } from "./alumno";

export interface Mesa {
    id: number,
    nombre: string,
    posicion: {
        x: number;
        y: number;
    };
    MesaID: string
}
