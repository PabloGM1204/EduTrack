import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, observeOn } from 'rxjs';
import { Mesa } from '../interfaces/mesa';

@Injectable({
  providedIn: 'root'
})
export class MesaService {

  // Lista de las mesas que hay
  private _mesas: BehaviorSubject<Mesa[]> = new BehaviorSubject<Mesa[]>([]);
  mesas$: Observable<Mesa[]> = this._mesas.asObservable();

  constructor() { }

  // ---------Métodos---------

  public getAll(): Observable<Mesa[]>{
    return new Observable(observer => {
      let lista: Mesa[] = [
        {id: 1, nombre: "Mesa 1", posicion:{x: 0, y:0}, alumno:{id: 1, nombre: "Alumno", foto:"FOTO"}},
        {id: 2, nombre: "Mesa 2", posicion:{x: 150, y:0}, alumno:{id: 2, nombre: "Prueba", foto:"FOTO"}},
        {id: 3, nombre: "Mesa 3", posicion:{x: 300, y:0}, alumno:{id: 3, nombre: "Testeo", foto:"FOTO"}}
      ]
      this._mesas.next(lista);
      observer.next(lista);
      observer.complete();
    })
  }

  /*updateMesa(mesa: Mesa ): Observable<Mesa> {
    return new Observable(observer =>{
      var _lista = [...this._mesas.value];
      var index = _lista.findIndex(m=>m.id==mesa.id);
      if(index<0){
        observer.error("Error");
      } else {
        _lista[index]=mesa;
        this._mesas.next(_lista);
        observer.next(mesa);
      }
      observer.complete();
    })
  }*/

  /*updateMesaPosition(mesa: Mesa, newPosition: { x: number, y: number }): void {
    var _lista = [...this._mesas.value];
    // mesa = _lista.find(m => m.id === mesaId);
    if (mesa) {
      mesa.posicion = newPosition;
    }
    this.updateMesa(mesa).subscribe()
  }*/
}
