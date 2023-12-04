import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Alumno } from 'src/app/core/interfaces/alumno';
import { Nota } from 'src/app/core/interfaces/nota';
import { AlumnoService } from 'src/app/core/services/api/alumno.service';
import { NotasService } from 'src/app/core/services/api/notas.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
})
export class InfoPage implements OnInit {

  dato: any | null = 'new';
  id: any | null = 1;
  alumnoSeleccionado: Alumno | undefined;
  notas: Nota[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private alumnoSvc: AlumnoService,
    private notasSvc: NotasService
  ) {
    
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.dato = this.route.snapshot.paramMap.get('dato');
    console.log("Que me llega a info: "+this.dato);
    if(this.dato == 'notas'){
      console.log("estamos en las notas y este es el id"+ this.id)
      this.notasSvc.getNotasPorAlumno(this.id).subscribe(notas => {
        this.notas = notas
      })
    } else if(this.dato != 'New'){
      this.dato = Number(this.dato)
      this.cargarAlumno(this.dato)
    }
  }
  

  onCancel(){
    this.router.navigate(['/alumnos']);
  }

  onSubmit(alumno: Alumno){
    console.log(alumno)
    if(this.dato == 'New'){
      this.alumnoSvc.addAlumno(alumno).subscribe(_ =>{
        console.log("Alumno creado");
        this.router.navigate(['/alumnos']);
      })
    } else {
      this.alumnoSvc.updateAlumno(alumno).subscribe(_ => {
        console.log("Alumno modificado");
        this.router.navigate(['/alumnos']);
      })
    }
  }

  cargarAlumno(id: number){
    this.alumnoSvc.getAlumno(id).subscribe(_ => {
      this.alumnoSeleccionado = _;
      console.log(this.alumnoSeleccionado)
    });
  }

}
