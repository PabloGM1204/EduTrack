import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Alumno } from 'src/app/core/interfaces/alumno';
import { AlumnoService } from 'src/app/core/services/api/alumno.service';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.page.html',
  styleUrls: ['./alumnos.page.scss'],
})
export class AlumnosPage implements OnInit {

  constructor(
    public alumnosSvc: AlumnoService
  ) { }

  ngOnInit() {
    this.alumnosSvc.getAll().subscribe();
  }

}
