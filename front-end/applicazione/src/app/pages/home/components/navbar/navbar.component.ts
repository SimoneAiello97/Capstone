import { Component } from '@angular/core';
import { AdminService } from 'src/app/pages/admin/admin.service';
import { HomeService } from '../../home.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/pages/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  nomeUtente!:string
  numeroCarrello:number|undefined
  constructor(private authSvc:AuthService, private adminSvc:AdminService,private homeSvc:HomeService, private router: Router){}
  ngOnInit(){
    this.adminSvc.getCart().subscribe(res =>{
      this.numeroCarrello = res.cartItem.length;

    })

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
