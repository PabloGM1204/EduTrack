import { Component } from '@angular/core';
import { MesaService } from 'src/app/core/services/api/mesa.service';
import { CdkDragEnd, CdkDragStart, CdkDragDrop, CdkDropList, CdkDropListGroup, moveItemInArray } from '@angular/cdk/drag-drop';
import { Mesa } from 'src/app/core/interfaces/mesa';
import { ModalController } from '@ionic/angular';
import { AlumnoComponent } from 'src/app/shared/components/alumno/alumno.component';
import { Router } from '@angular/router';
import { ModalSelectionComponent } from 'src/app/shared/components/modal-selection/modal-selection.component';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  private _mesas = new BehaviorSubject<Mesa[]>([]);
  public mesas$ = this._mesas.asObservable();

  constructor(
    public mesas: MesaService,
    private modal: ModalController,
    private rotuer: Router
  ) {}

  //TODO: añadir loading

  private loadMesas(){
    this.mesas.getAll().subscribe({
      next: response => {
        this._mesas.next(response);
      },
      error: err => {
        console.log(err)
      }
    });
  }

  ngOnInit(): void{
    this.loadMesas();
    console.log(this._mesas.value)

    //this.mesas.getAll().subscribe();
  }

  recargarMesas(){
    this.mesas.actualizarPosicionesMesas();
  }

  crearMesa(){
    this.mesas.addMesa().subscribe();
  }

  public async mesaClick(mesa: Mesa){
    console.log("Mesa clickeado")
    var onDismiss = (info:any) => {
      console.log(info)
    }
    this.presentForm(mesa, onDismiss)

    //this.rotuer.navigate(["/info", mesa.id])
  }

  async presentForm(data: Mesa | null, onDismiss:(result:any)=>void){
    
    const modal = await this.modal.create({
      component: ModalSelectionComponent,
      componentProps:{
        mesa: data
      },
      cssClass:"modal"
    });
    modal.present();
    modal.onDidDismiss().then(result=>{
      if(result && result.data){
        onDismiss(result);
      }
    });
  }
}
