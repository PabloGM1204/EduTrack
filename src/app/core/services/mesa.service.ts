import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, observeOn, tap } from 'rxjs';
import { Mesa } from '../interfaces/mesa';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MesaService {

  // Lista de las mesas que hay
  private _mesas: BehaviorSubject<Mesa[]> = new BehaviorSubject<Mesa[]>([]);
  mesas$: Observable<Mesa[]> = this._mesas.asObservable();

  constructor(
    private http: HttpClient
  ) { }

  // ---------Métodos---------

  public getAll(): Observable<Mesa[]>{
    return this.http.get<Mesa[]>(environment.ApiJsonServerUrl+'/mesas').pipe(tap((mesas:any[])=>{
      console.log(mesas)
      this._mesas.next(mesas)
    }))

    /*
    return new Observable(observer => {
      let lista: Mesa[] = [
        {id: 1, nombre: "Mesa 1", posicion:{x: 0, y:50}, alumno:{id: 1, nombre: "Alumno", foto:"FOTO"}},
        {id: 2, nombre: "Mesa 2", posicion:{x: 150, y:50}, alumno:{id: 2, nombre: "Prueba", foto:"FOTO"}},
        {id: 3, nombre: "Mesa 3", posicion:{x: 300, y:50}, alumno:{id: 3, nombre: "Testeo", foto:"FOTO"}}
      ]
      this._mesas.next(lista);
      observer.next(lista);
      observer.complete();
    })
    */
  }

  updateMesa(mesa: Mesa): Observable<Mesa> {
    return new Observable<Mesa>(obs =>{
      this.http.patch<Mesa>(environment.ApiJsonServerUrl+`/mesas/${mesa.id}`, mesa).subscribe(_=>{
        console.log(mesa)
        obs.next(mesa);
      })
    })
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


}
