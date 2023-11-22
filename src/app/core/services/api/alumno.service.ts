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
  
    return this.http.get('/alumnos').pipe(map(response => response.data.map((item: { id: any; attributes: { Nombre: any; Email: any; AlumnoId: any; FechaNacimiento: any }; }) => ({
      id: item.id,
      nombre: item.attributes.Nombre,
      email: item.attributes.Email,
      alumnoId: item.attributes.AlumnoId,
      fechaNacimiento: item.attributes.FechaNacimiento
    }))),
    tap(alumnos => {
      if(Array.isArray(alumnos)){
        this._alumnos.next(alumnos);
      } else{
        console.log("ADIOS")
      }
    })
    )
  
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
    return this.http.get(environment.ApiStrapiUrl+'/alumnos?q='+q)
  }

  public getAlumno(id: number): Observable<Alumno>{
    return this.http.get(environment.ApiStrapiUrl+`/alumnos/${id}`);
  }


  public updateMesa(alumno: Alumno): Observable<Alumno> {
    return new Observable<Alumno>(obs =>{
      this.http.patch(environment.ApiStrapiUrl+`/alumnos/${alumno.id}`, alumno).subscribe(_=>{
        console.log(alumno)
        obs.next(alumno);
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
      catchError( error => {
        console.log("Error creando Alumno");
        throw error;
      })
    );
    /*return this.http.post("/alumnos", _alumno).pipe(tap(_=>{
      this.getAll().subscribe();
    }))*/
  }


  public deleteAlumnos(alumno: Alumno): Observable<Alumno>{
    return new Observable<Alumno>(obs=>{
      this.http.delete(environment.ApiStrapiUrl+`/alumnos/${alumno.id}`).subscribe(_=>{
        this.getAll().subscribe(_=>{
          obs.next(alumno);
        });
      });
    });
  }


}