import { Message } from 'primeng/api';

import { Component } from '@angular/core';
import { ISignIn } from 'src/app/interfaces/ISignIn';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  value: string | undefined;
  validazione:boolean = false;
  credenziali:boolean = false;
  messages!: Message[];
  messages2!: Message[];

  data:ISignIn = {
    username: '',
    password: ''
  }




constructor(private authSvc:AuthService,private router: Router){}

ngOnInit() {
  // Iscriviti all'observable per ricevere il segnale quando l'utente non è autenticato
  this.clearMessages()
  this.authSvc.userNotAuthenticated$.subscribe(() => {
    console.log("L'utente non è autenticato");
    this.addMessages2()
  });
  this.authSvc.userCredenziali$.subscribe(() => {
    console.log("credenziali non valide");
      this.addMessages()
  });
}
login(){
  this.authSvc.signIn(this.data)
  .subscribe(data => {
    if (data) {
      console.log('Sei loggato', data);
      const userRoles = data;
    } else {
      // Non fare nulla se l'autenticazione non ha successo
      console.log("L'utente non è stato autenticato con successo");
    }
  })
}

addMessages() {
  this.messages = [{ severity: 'error', summary: 'Error', detail: 'Credenziali non valide' }];
}
addMessages2() {
  this.messages2 = [
    { severity: 'error', summary: 'Error', detail: 'L`utente non è autenticato' },
];
}
clearMessages() {
  this.messages = [];
}
}
