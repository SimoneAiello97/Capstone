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
  data: ISignUp = {
    email: '',
    password: '',
    name: '',
    username: ''
  }
  messages!: Message[];
  validazione:boolean = false;


  constructor(private authSvc:AuthService, private router:Router){}

  ngOnInit() {
      this.messages = [{ severity: 'success', summary: 'Success', detail: 'User create successfully! Please, check your email to complete your registration!' }];
  }
    register(){
      this.authSvc.signUp(this.data)
      .subscribe(res =>

      this.validazione = true
        )
    }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
}
