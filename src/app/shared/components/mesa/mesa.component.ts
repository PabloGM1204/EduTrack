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

  dragEnded(event: CdkDragEnd) {
    console.log("Soltado");
    console.log("Cosas:" + event.source.getFreeDragPosition());
    const element = event.source.getRootElement();
    const boundingClientRect = element.getBoundingClientRect();
    
    let parentPosition = { left: 0, top: 0 };
    if (element.parentElement) {
      parentPosition = this.getPosition(element.parentElement);
    }
  
    const newPosition = {
      x: boundingClientRect.x - parentPosition.left,
      y: boundingClientRect.y - parentPosition.top
    };
  
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

  // 
  private getPosition(el: HTMLElement): { top: number; left: number; } {
    let x = 0;
    let y = 0;
    while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
      x += el.offsetLeft - el.scrollLeft;
      y += el.offsetTop - el.scrollTop + 2.75;
      el = el.offsetParent as HTMLElement;
    }
    return { top: y, left: x };
  }
}
