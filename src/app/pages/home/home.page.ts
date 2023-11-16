import { Component } from '@angular/core';
import { MesaService } from 'src/app/core/services/mesa.service';
import { CdkDragEnd, CdkDragStart, CdkDragDrop, CdkDropList, CdkDropListGroup, moveItemInArray } from '@angular/cdk/drag-drop';
import { Mesa } from 'src/app/core/interfaces/mesa';
import { ModalController } from '@ionic/angular';
import { AlumnoComponent } from 'src/app/shared/components/alumno/alumno.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    public mesas: MesaService,
    private rotuer: Router
  ) {}

  //TODO: añadir loading

  ngOnInit(): void{
    this.mesas.getAll().subscribe();
  }

  recargarMesas(){
    this.mesas.actualizarPosicionesMesas();
  }

  crearMesa(){
    this.mesas.addMesa().subscribe();
  }

  mesaClick(mesa: Mesa){
    console.log("Mesa clickeado")
    this.rotuer.navigate(["/info", mesa.id])
  }
}
