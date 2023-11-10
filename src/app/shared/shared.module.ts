import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MesaComponent } from './components/mesa/mesa.component';



@NgModule({
  declarations: [
    // Directivas

    // Pipes

    // Componentes
    MesaComponent
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
    MesaComponent
  ]
})
export class SharedModule { }
