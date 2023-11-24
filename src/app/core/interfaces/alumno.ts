import { Media } from "./media";

export interface Alumno {
    id: number,
    nombre: string,
    fechaNacimiento: string,
    email: string,
    foto?: Media | null,
}
