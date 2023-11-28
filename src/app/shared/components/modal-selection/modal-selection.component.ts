import { Component, Input, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { IonInput, IonPopover, ModalController } from '@ionic/angular';
import { lastValueFrom } from 'rxjs';
import { Alumno } from 'src/app/core/interfaces/alumno';
import { Mesa } from 'src/app/core/interfaces/mesa';
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
  disable: boolean = false;
  alumnos: Alumno[] = [];

  form:FormGroup;
  mode:'New'|'Edit' = 'New';
  @Input() set mesa(_mesa: Mesa | null){
    if(_mesa){
      this.form.controls['nombre'].setValue(_mesa.nombre);
    }
  }

  propagateChange = (obj: any) => {}

  constructor(
    public alumnoSvc: AlumnoService,
    private formBuilder:FormBuilder,
    private _modal: ModalController

  ) {
    this.form = this.formBuilder.group({
      nombre:['', [Validators.required]]
    })
  }


  onSubmit(){
    this._modal.dismiss(this.form.value, 'ok');
  }

  onDelete(){
    this._modal.dismiss(this.form.value, 'delete');
  }

  onSave(){
    this._modal.dismiss(this.form.value, 'ok');
  }

  async onLoadAlumnos(){
    console.log("Selectable click")
    this.alumnos = await lastValueFrom(this.alumnoSvc.getAll());
    console.log(this.alumnos);
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

  ngOnInit() {
    console.log("Nombre de la mesa en el modal"+this.mesa?.nombre)
  }

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
