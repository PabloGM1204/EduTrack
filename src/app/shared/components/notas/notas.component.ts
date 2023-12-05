import { Component, Input, OnInit } from '@angular/core';
import { Nota } from 'src/app/core/interfaces/nota';
import { ModalNotaComponent } from '../modal-nota/modal-nota.component';
import { ModalController } from '@ionic/angular';
import { NotasService } from 'src/app/core/services/api/notas.service';

@Component({
  selector: 'app-notas',
  templateUrl: './notas.component.html',
  styleUrls: ['./notas.component.scss'],
})
export class NotasComponent  implements OnInit {

  @Input() notas: Nota[] = [];
  @Input() alumnoId: number = 0;

  constructor(
    private modal: ModalController,
    private notasSvc: NotasService
  ) { }

  ngOnInit() {
    console.log(this.notas)
  }

  nuevaNota(){
    var onDismiss = (info:any)=>{
      console.log(info);
      switch(info.role){
        case 'ok':{
          const _nota = {
            calificacion: info.data.calificacion,
            fecha: info.data.fecha,
            descripcion: info.data.descripcion,
            asignatura: info.data.asignatura,
            alumnoId: this.alumnoId,
            id: 0,
            alumnoNombre: ""
          }
          console.log(_nota)
          this.notasSvc.addNota(_nota).subscribe()
        }
        break;
        default:{
          console.error("No debería entrar");
        }
      }
    }
    this.presentForm(null, onDismiss);
  }

  editarNota(nota: Nota){
    var onDismiss = (info:any)=>{
      console.log(info);
      switch(info.role){
        case 'ok':{
          const _nota = {
            calificacion: info.data.calificacion,
            fecha: info.data.fecha,
            descripcion: info.data.descripcion,
            asignatura: info.data.asignatura,
            alumnoId: this.alumnoId,
            id: nota.id,
            alumnoNombre: ""
          }
          console.log(_nota)
          this.notasSvc.updateNota(_nota).subscribe()
        }
        break;
        default:{
          console.error("No debería entrar");
        }
      }
    }
    this.presentForm(nota, onDismiss);
  }

  eliminarNota(nota: Nota){
    this.notasSvc.deleteNota(nota).subscribe()
  }

  async presentForm(data: Nota | null, onDismiss:(result:any)=>void){
    const modal = await this.modal.create({
      component: ModalNotaComponent,
      componentProps:{
        nota: data
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
