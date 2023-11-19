import { Component, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IonInput, IonPopover } from '@ionic/angular';
import { lastValueFrom } from 'rxjs';
import { Alumno } from 'src/app/core/interfaces/alumno';
import { AlumnoService } from 'src/app/core/services/api/alumno.service';

export const ALUMNO_SELECTABLE_VALUE_ACCESOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ModalSelectionComponent),
  multi: true
}

@Component({
  selector: 'app-modal-selection',
  templateUrl: './modal-selection.component.html',
  styleUrls: ['./modal-selection.component.scss'],
  providers:[ALUMNO_SELECTABLE_VALUE_ACCESOR]
})
export class ModalSelectionComponent  implements OnInit, ControlValueAccessor {

  alumnoSelected: Alumno | undefined;
  disable: boolean = true;
  alumnos: Alumno[] = [];

  propagateChange = (obj: any) => {}

  constructor(
    public alumnoSvc: AlumnoService
  ) { }

  async onLoadAlumnos(){
    this.alumnos = await lastValueFrom(this.alumnoSvc.getAll());
  }

  private async selectAlumno(id: number | undefined, propagate: boolean = false){
    if(id){
      this.alumnoSelected = await lastValueFrom(this.alumnoSvc.getAlumno(id));
    } else {
      this.alumnoSelected = undefined;
    }

    if(propagate)
      this.propagateChange(this.alumnoSelected);
  }

  
  writeValue(obj: any): void {
    this.selectAlumno(obj)
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
      
  }

  setDisabledState(isDisabled: boolean): void {
    this.disable = isDisabled;
  }

  ngOnInit() {}

  private async filter(value: string){
    const query = value;
    const alumnos = await lastValueFrom(this.alumnoSvc.query(query))
    this.alumnos = alumnos.filter(a => a.nombre.toLowerCase().includes(query.toLowerCase()));
  }

  onFilter(evt: any){
    this.filter(evt.detail.value)
  }

  onAlumnoClicked(popover: IonPopover, alumno: Alumno){
    this.selectAlumno(alumno.id);
    popover.dismiss();
  }

  clearSearch(input: IonInput){
    input.value = "";
    this.filter("");
  }

  deselect(popover: IonPopover | null = null){
    this.selectAlumno(undefined, true);
    if(popover)
      popover.dismiss();
  }

}
