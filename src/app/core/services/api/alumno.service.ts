import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, lastValueFrom, map, tap } from 'rxjs';
import { Alumno } from '../../interfaces/alumno';
import { ApiService } from './api.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {
  // Lista de las mesas que hay
  private _alumnos: BehaviorSubject<Alumno[]> = new BehaviorSubject<Alumno[]>([]);
  alumnos$: Observable<Alumno[]> = this._alumnos.asObservable();

  constructor(
    private http: ApiService
  ) { }

  // ---------Métodos---------

  public getAll(): Observable<Alumno[]>{
  
    return this.http.get('/alumnos/?populate=Foto').pipe(map(response => response.data.map((item: {
      id: any; attributes: { Foto: any; Nombre: any; Email: any; FechaNacimiento: any }; }) => {
        return {
          id: item.id,
          nombre: item.attributes.Nombre,
          email: item.attributes.Email,
          fechaNacimiento: item.attributes.FechaNacimiento,
          foto: item.attributes.Foto?.data?{
            id: item.attributes.Foto.data.id,
            url_large: item.attributes.Foto.data.attributes.formats.large?.url,
            url_small: item.attributes.Foto.data.attributes.formats.small?.url,
            url_medium: item.attributes.Foto.data.attributes.formats.medium?.url,
            url_thumbnail: item.attributes.Foto.data.attributes.formats.thumbnail?.url,
          }:null
      }})));
  
    /*return this.http.get('/mesas').pipe(tap((mesas:any[])=>{
    console.log(mesas)
    this._mesas.next(mesas)
  }))*/

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

  public query(q: string): Observable<Alumno[]>{
    return this.http.get('/alumnos?q='+q)
  }

  public getAlumno(id: number): Observable<Alumno>{
    return this.http.get(`/alumnos/${id}`).pipe(map(response => {
      const attributes = response.data.attributes;
      const alumnoMapeado: Alumno = {
        id: response.data.id,
        nombre: attributes.Nombre,
        fechaNacimiento: attributes.FechaNacimiento,
        email: attributes.Email
      };
      console.log("Alumno mapeado "+ alumnoMapeado);
      return alumnoMapeado;
    }))
  }


  public updateAlumno(_alumno: Alumno): Observable<Alumno> {
    console.log(_alumno.id)
    let actualizarAlumno = {
      data: {
        Nombre: _alumno.nombre,
        FechaNacimiento: _alumno.fechaNacimiento,
        Email: _alumno.email
      }
    }
    return new Observable<Alumno>(obs =>{
      this.http.put(`/alumnos/${_alumno.id}`, actualizarAlumno).subscribe(_=>{
        console.log(_alumno)
        obs.next(_alumno);
        this.getAll().subscribe()
      })
    })
  }


  public addAlumno(_alumno: Alumno): Observable<Alumno>{
    let crearAlumno = {
      data: {
        Nombre: _alumno.nombre,
        FechaNacimiento: _alumno.fechaNacimiento,
        Email: _alumno.email
      }
    };
    console.log(crearAlumno)
    return this.http.post("/alumnos", crearAlumno).pipe(
      tap(_ => {
        this.getAll().subscribe();
      }),
      catchError( error => {
        console.log("Error creando Alumno");
        throw error;
      })
    );
    /*return this.http.post("/alumnos", _alumno).pipe(tap(_=>{
      this.getAll().subscribe();
    }))*/
  }


  public deleteAlumno(alumno: Alumno): Observable<Alumno>{
    return new Observable<Alumno>(obs=>{
      this.http.delete(`/alumnos/${alumno.id}`).subscribe(_=>{
        this.getAll().subscribe(_=>{
          obs.next(alumno);
        });
      });
    });
  }


}