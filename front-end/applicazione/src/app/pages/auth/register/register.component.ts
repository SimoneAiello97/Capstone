import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ISignUp } from 'src/app/interfaces/ISignUp';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Message } from 'primeng/api';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent  implements OnInit {
  value: string | undefined;
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(5)]);
  username = new FormControl('', [Validators.required]);
  name = new FormControl('', [Validators.required]);
  data: ISignUp = {
    email: '',
    password: '',
    name: '',
    username: ''
  }
  messages!: Message[];



  constructor(private authSvc:AuthService, private router:Router){}

  ngOnInit() {
    this.clearMessages()
  }
    register(){
      this.authSvc.signUp(this.data)
      .subscribe(res =>

        this.addMessages()
        )
    }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      console.log('email is required');

      return 'You must enter a value';
    }
    if (this.name.hasError('required')) {
      console.log('name is required');
      return 'You must enter a value';
    }
    if (this.username.hasError('required')) {
      console.log('username is required');
      return 'You must enter a value';
    }
    if (this.password.hasError('required')) {
      console.log('password is required');
      return 'You must enter a value';
    }
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  addMessages() {
    this.messages = [{ severity: 'Success', summary: 'Success', detail: "Verifica l'email per completare la registrazione!" }];
  }
  clearMessages() {
    this.messages = [];
  }
}
