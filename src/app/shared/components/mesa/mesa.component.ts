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

  ngOnInit() {}

  onDragEnded(event: CdkDragEnd): void{
    // Obtén la posición del drag después de que ha terminado
    const newPosition = event.source.getFreeDragPosition();

    // Asegúrar de que la mesa tenga una propiedad 'posicion' inicializada
    if (this.mesa) {
      // Si 'posicion' no está definida, inicialízala
      if (!this.mesa.posicion) {
        this.mesa.posicion = { x: 0, y: 0 };
      }

      // Ahora asigna las nuevas coordenadas a la propiedad 'posicion' de la mesa
      this.mesa.posicion.x = newPosition.x;
      this.mesa.posicion.y = newPosition.y;
      
      // Actualizar los datos
      // this.mesaService.updateMesa(this.mesa);
    }
  }
}
