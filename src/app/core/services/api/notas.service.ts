import { Injectable } from '@angular/core';
import { Nota } from '../../interfaces/nota';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class NotasService {
// Lista de las mesas que hay
private _notas: BehaviorSubject<Nota[]> = new BehaviorSubject<Nota[]>([]);
notas$: Observable<Nota[]> = this._notas.asObservable();

constructor(
  private http: ApiService
) { }

// ---------Métodos---------

public getAll(): Observable<Nota[]>{
  
  return this.http.get('/notas/?populate=alumnoFK').pipe(map(response => response.data.map((item: { id: any; attributes: {
    alumnoFK: any;
    Asignatura: any; Calificacion: any; Fecha: any; Descripcion: any;
}; }) => ({
    id: item.id,
    calificacion: item.attributes.Calificacion,
    fecha: item.attributes.Fecha,
    descripcion: item.attributes.Descripcion,
    asignatura: item.attributes.Asignatura,
    alumnoID: item.attributes.alumnoFK.data?.id
  }))),
  tap(nota => {
    console.log(nota);
    this._notas.next(nota);
  })
  )
}


public getNotasPorAlumno(alumnoId: number): Observable<Nota[]>{
  return this.http.get(`/notas?filters[alumnoFK][id][$eq]=${alumnoId}&populate=*`).pipe(map(response => response.data.map((item: { id: any; attributes: {
    alumnoFK: any; Asignatura: any; Calificacion: any; Fecha: any; Descripcion: any;
}; }) => ({
    id: item.id,
    calificacion: item.attributes.Calificacion,
    fecha: item.attributes.Fecha,
    descripcion: item.attributes.Descripcion,
    asignatura: item.attributes.Asignatura,
    alumnoID: item.attributes.alumnoFK.data?.id,
    alumnoNombre: item.attributes.alumnoFK.data?.attributes.Nombre
  }))),
  tap(nota => {
    console.log(nota);
    this._notas.next(nota);
  })
  )

}


/*
public getMesa(id: number): Observable<Mesa>{
  return this.http.get(environment.ApiStrapiUrl+`/mesas/${id}`);
}


public updateMesa(mesa: Mesa): Observable<Mesa> {
  console.log("Recibo mesa: "+mesa.posicion)
  let actualizarMesa = {
    data: {
      NombreMesa: mesa.nombre,
      posicion: mesa.posicion,
      alumnoFK: mesa.AlumnoID
    }
  }
  return new Observable<Mesa>(obs => {
    this.http.put(`/mesas/${mesa.id}`, actualizarMesa).subscribe({
      next: (_) => {
        obs.next(mesa); // Emitir la mesa actualizada
        this.getAll().subscribe()
      },
      error: (err) => {
        console.error('Error al actualizar la mesa:', err, 'Datos de la mesa:', actualizarMesa);
        obs.error(err); // Emitir el error
      },
      complete: () => {
        obs.complete(); // Completar el Observable
      }
    });
  });
}

actualizarPosicionesMesas(): void {
  // Copio el array que tengo de mesas, con el .map y copio los valores de cada mesa solo que le cambio la posición
  const mesasActualizadas = this._mesas.value.map(mesa => ({
    ...mesa,
    posicion: { x: 0, y: 0 }
  }));
  console.log("Poner visible")
  // Actualizamos todos las subscripciones
  this._mesas.next(mesasActualizadas);
}


public addMesa(mesa: Mesa): Observable<Mesa>{
  var _mesa = {
    data: {
      NombreMesa: mesa.nombre,
      posicion: {
        x: mesa.posicion.x,
        y: mesa.posicion.y
      },
      AlumnoID: mesa.AlumnoID,
    }
  };
  return this.http.post("/mesas", _mesa).pipe(tap(_=>{
    this.getAll().subscribe();
  }))
}


public deleteMesa(mesa: Mesa): Observable<Mesa>{
  return new Observable<Mesa>(obs=>{
    this.http.delete(`/mesas/${mesa.id}`).subscribe(_=>{
      this.getAll().subscribe(_=>{
        obs.next(mesa);
      });
    });
  });
}
*/

}
