import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserCredentials } from 'src/app/core/interfaces/user-credentials';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
})
export class RegisterFormComponent  implements OnInit {

  @Output() hacerRegister = new EventEmitter<UserCredentials>();
  
  form: FormGroup | null = null;

  constructor(
    private formBuilder: FormBuilder
  ) { 
    this.form = this.formBuilder.group({
      username:['', [Validators.required]],
      email:['', [Validators.required]],
      password:['', [Validators.required]]
    });
  }

  ngOnInit() {}

  onSubmit(){
    this.hacerRegister.emit(this.form?.value)
  }



}
