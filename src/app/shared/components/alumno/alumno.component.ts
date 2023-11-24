import { Component, Input, OnInit } from '@angular/core';
import { Alumno } from 'src/app/core/interfaces/alumno';
import { Media } from 'src/app/core/interfaces/media';

@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.component.html',
  styleUrls: ['./alumno.component.scss'],
})
export class AlumnoComponent  implements OnInit {

  @Input() alumno: Alumno | null = null;

  @Input() foto: string | undefined = "";
  @Input() nombre: string | null = null;
  @Input() fechaNacimiento: string | null = null;
  @Input() email: string | null = null;

  constructor() {}

  ngOnInit() {
    console.log(this.alumno?.nombre)
  }

}
