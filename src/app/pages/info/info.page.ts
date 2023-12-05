import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Alumno } from 'src/app/core/interfaces/alumno';
import { Nota } from 'src/app/core/interfaces/nota';
import { AlumnoService } from 'src/app/core/services/api/alumno.service';
import { NotasService } from 'src/app/core/services/api/notas.service';
import { ModalNotaComponent } from 'src/app/shared/components/modal-nota/modal-nota.component';

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
      this.cargarNotas(this.id);
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

  anadirNota(nota: Nota){
    this.notasSvc.addNota(nota).subscribe({
      next: () => {
        this.cargarNotas(this.id)
      }
    })
  }

  editarNotar(nota: Nota){
    this.notasSvc.updateNota(nota).subscribe({
      next: (notaModificada) => {
        // Encuentra el índice de la nota actualizada en la lista local
        const index = this.notas.findIndex(nota => nota.id === notaModificada.id);
        if (index !== -1) {
          // Actualiza la nota en la lista local
          this.notas[index] = notaModificada;
          this.notas = [...this.notas];
        }
      },
      error: (error) => {
        console.error("Error al actualizar la nota", error);
      }
    });
  }

  eliminarNota(nota: Nota){
    this.notasSvc.deleteNota(nota).subscribe(notas => {
      this.notas = notas;
    })
  }

  cargarNotas(alumnoId: number) {
    this.notasSvc.getNotasPorAlumno(alumnoId).subscribe(notas => {
      this.notas = notas;
    });
  }


}
