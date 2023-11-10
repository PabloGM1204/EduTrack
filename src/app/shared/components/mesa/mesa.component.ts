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

  dragStart($event: any){
    console.log("Empieza")
  }

  dragEnded(event: CdkDragEnd){
    console.log("Soltado")
    console.log(event.source.getFreeDragPosition())
  }
}
