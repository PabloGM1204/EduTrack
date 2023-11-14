import { Component, Input, OnInit } from '@angular/core';
import { Mesa } from 'src/app/core/interfaces/mesa';
import { MesaService } from 'src/app/core/services/mesa.service';
import { CdkDragEnd } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-mesa',
  templateUrl: './mesa.component.html',
  styleUrls: ['./mesa.component.scss'],
})
export class MesaComponent  implements OnInit {

  @Input() mesa: Mesa | null = null;

  constructor(
    private mesaService: MesaService
  ) { }

  ngOnInit() {
    console.log("Posicion"+this.mesa?.posicion.x+" "+this.mesa?.posicion.y)
  }

  dragEnded(event: CdkDragEnd){
    console.log("Soltado");
    console.log(event.source.getFreeDragPosition());
    const newPosition = event.source.getFreeDragPosition();
    // Creo la nueva mesa con los datos actualizados
    const updatedMesa = { ...this.mesa, posicion: newPosition };
    if (this.mesa && this.mesa.id !== undefined) {
      const updatedMesa = { ...this.mesa, posicion: newPosition };
      this.mesaService.updateMesa(updatedMesa).subscribe({
        next: (res) => console.log('Mesa actualizada con éxito', res),
        error: (err) => console.error('Error al actualizar la mesa', err)
      });
    } else {
      console.error('Error: Mesa no tiene ID');
    }
  }
}
