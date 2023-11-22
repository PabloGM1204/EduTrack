import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlumnoService } from 'src/app/core/services/api/alumno.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
})
export class InfoPage implements OnInit {

  form: FormGroup;
  dato: string | null = 'new';
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private alumnoSvc: AlumnoService,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      nombre:['', [Validators.required]],
      email:['', [Validators.required]],
      fechaNacimiento:['01/01/2001', [Validators.required]]
    })
  }

  ngOnInit() {
    this.dato = this.route.snapshot.paramMap.get('dato');
    console.log("Que me llega a info: "+this.dato);
  }

  onDelete(){
    this.router.navigate(['/alumnos']);
  }

  onCancel(){
    this.router.navigate(['/alumnos']);
  }

  onSubmit(){
    console.log(this.form.value)
    this.alumnoSvc.addAlumno(this.form.value).subscribe(_ =>{
      console.log("Alumno creado");
      this.router.navigate(['/alumnos']);
    })
  }

}
