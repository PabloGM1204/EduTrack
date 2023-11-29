import { Component } from '@angular/core';
import { MesaService } from 'src/app/core/services/api/mesa.service';
import { Mesa } from 'src/app/core/interfaces/mesa';
import { ModalController } from '@ionic/angular';
import { ModalSelectionComponent } from 'src/app/shared/components/modal-selection/modal-selection.component';
import { BehaviorSubject } from 'rxjs';
import { AlumnoService } from 'src/app/core/services/api/alumno.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  private _mesas = new BehaviorSubject<Mesa[]>([]);
  public mesas$ = this._mesas.asObservable();

  constructor(
    public mesasSvc: MesaService,
    private modal: ModalController,
    private alumnoSvc: AlumnoService
  ) {}

  //TODO: añadir loading

  private loadMesas(){
    this.mesasSvc.getAll().subscribe({
      next: response => {
        this._mesas.next(response);
      },
      error: err => {
        console.log(err)
      }
    });
  }

  ngOnInit(): void{
    this.mesasSvc.getAll().subscribe(mesas => {
      mesas.forEach(mesa => {
        if (mesa.AlumnoID) {
          this.alumnoSvc.getAlumno(mesa.AlumnoID).subscribe(alumno => {
            mesa.alumnoNombre = alumno.nombre; // Asegúrate de tener un campo para almacenar el nombre del alumno en tu modelo de mesa
          });
        }
      });
    })
    //this.loadMesas();
    console.log(this._mesas.value)

    //this.mesas.getAll().subscribe();
  }

  recargarMesas(){
    this.mesasSvc.actualizarPosicionesMesas();
  }

  crearMesa() {
    this.presentForm(null, (info: any) => {
      if (info.role === 'ok') {
        const nuevaMesa: Mesa = {
          nombre: info.data.nombre,
          // Asumiendo que tienes valores predeterminados o nulos para estos campos
          id: 0, // O cualquier lógica para asignar un nuevo ID
          posicion: { x: 0, y: 0 }, // Posición inicial predeterminada
          AlumnoID: 0 // O cualquier valor predeterminado
        };
        console.log('Nueva Mesa:', nuevaMesa);
        this.mesasSvc.addMesa(nuevaMesa).subscribe({
          next: mesaCreada => {
            console.log('Mesa creada:', mesaCreada);
            // Aquí puedes recargar las mesas o actualizar la UI según sea necesario
          },
          error: err => console.error('Error al crear mesa:', err)
        });
      }
    });
  }

  public async mesaClick(mesa: Mesa){
    console.log("Mesa clickeado")
    var onDismiss = (info:any) => {
      console.log(info);
      const nuevaMesa: Mesa = {
        nombre: info.data.nombre,
        id: mesa.id,
        posicion: {
          x: mesa.posicion.x,
          y: mesa.posicion.y
        },
        AlumnoID: info.data.alumnoId
      }
      console.log(nuevaMesa)
      switch(info.role){
        case 'ok': {
          this.mesasSvc.updateMesa(nuevaMesa).subscribe()
        }
        break;
        case 'delete': {
          this.mesasSvc.deleteMesa(nuevaMesa).subscribe()
        }
      }
    }
    this.presentForm(mesa, onDismiss)
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
