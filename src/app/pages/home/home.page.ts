import { Component } from '@angular/core';
import { MesaService } from 'src/app/core/services/mesa.service';
import { CdkDragEnd, CdkDragStart, CdkDragDrop } from '@angular/cdk/drag-drop';
import { Mesa } from 'src/app/core/interfaces/mesa';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    public mesas: MesaService // Servicio de mesa
  ) {}

  ngOnInit(): void{
    this.mesas.getAll().subscribe();
  }

  // Cuando empice el arrastre
  onDragStarted(event: CdkDragStart, mesa: Mesa): void{
    console.log("Inicio el drag and drop");
  }

  onDrop(event: CdkDragDrop<any[]>):void{
    console.log("Soltado")
  }

  onDragEnded(event: CdkDragEnd, mesa: Mesa): void {
    console.log('Arrastre finalizado', event);
  
    // Actualiza la posición en el modelo de datos
    const newPosition = event.source.getFreeDragPosition();
    mesa.posicion = newPosition;
    
    // Guarda la nueva posición en el backend o almacenamiento local
    /*this.mesas.updateMesaPosition(mesa, newPosition).subscribe({
      next: (res) => console.log('Posición actualizada con éxito', res),
      error: (err) => console.error('Error al actualizar la posición', err)
    });*/
    
  }
}
