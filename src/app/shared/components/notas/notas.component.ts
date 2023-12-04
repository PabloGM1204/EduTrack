import { Component, Input, OnInit } from '@angular/core';
import { Nota } from 'src/app/core/interfaces/nota';

@Component({
  selector: 'app-notas',
  templateUrl: './notas.component.html',
  styleUrls: ['./notas.component.scss'],
})
export class NotasComponent  implements OnInit {

  @Input() notas: Nota[] = [];

  constructor() { }

  ngOnInit() {}

}
