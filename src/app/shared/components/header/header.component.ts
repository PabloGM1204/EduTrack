import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {
  
  @Input() username: string | undefined = "Usuario de prueba";
  @Input() nickname: string | undefined = "Usuario"
  @Output() onSignout = new EventEmitter();
  @Output() onProfile = new EventEmitter();
  constructor() { }

  ngOnInit() {}

}
