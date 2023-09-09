import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  nomeUtente!:string
  constructor(private authSvc:AuthService, private router: Router){}
  ngOnInit(){
    const utente:any = localStorage.getItem('user')
    const utenteparsato = JSON.parse(utente)
    console.log(utenteparsato);

    this.nomeUtente = utenteparsato.username
  }
  logout(){
    this.authSvc.logout()
    this.router.navigate(['/auth'])
  }
}
