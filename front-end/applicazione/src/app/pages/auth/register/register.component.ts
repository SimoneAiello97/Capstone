import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ISignUp } from 'src/app/interfaces/ISignUp';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  value: string | undefined;
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(5)]);
  data: ISignUp = {
    email: '',
    password: '',
    name: '',
    username: ''
  }

    constructor(private authSvc:AuthService, private router:Router){}

    register(){
      this.authSvc.signUp(this.data)
      .subscribe(res =>

      this.router.navigate(['./auth/login'])
        )
    }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
}
