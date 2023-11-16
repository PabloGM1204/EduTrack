import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MesaComponent } from './components/mesa/mesa.component';
import { ModalSelectionComponent } from './components/modal-selection/modal-selection.component';
import { AlumnoComponent } from './components/alumno/alumno.component';
import { AlumnoItemComponent } from './components/alumno-item/alumno-item.component';


@NgModule({
  declarations: [
    // Directivas

    // Pipes

    // Componentes
    MesaComponent,
    ModalSelectionComponent,
    AlumnoComponent,
    AlumnoItemComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    DragDropModule
  ],
  exports: [
    // Modulos
    CommonModule,
    IonicModule,
    FormsModule,
    DragDropModule,
    // Directivas

    // Componentes
    MesaComponent,
    ModalSelectionComponent,
    AlumnoComponent,
    AlumnoItemComponent
  ]
})
export class SharedModule { }
