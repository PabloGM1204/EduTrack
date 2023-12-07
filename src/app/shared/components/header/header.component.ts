import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/core/interfaces/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {
  
  @Input() user: User | undefined;
  @Output() onSignout = new EventEmitter();
  @Output() onProfile = new EventEmitter();
  constructor() { }

  ngOnInit() {}

}
