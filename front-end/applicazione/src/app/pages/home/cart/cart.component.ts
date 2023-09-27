
import { Component } from '@angular/core';
import { HomeService } from '../home.service';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {

  items:any[]|undefined | null
  cart:any|undefined |null
  nomeUtente!:string
  numeroCarrello:number|undefined

  constructor(private homeSvc:HomeService,
     private router:Router,
      private authSvc:AuthService){}

  ngOnInit(){
    this.getCart();
    const utente:any = localStorage.getItem('user')
    const utenteparsato = JSON.parse(utente)
    console.log(utenteparsato);

    this.nomeUtente = utenteparsato.username
  }
  logout(){
    this.authSvc.logout()
    this.router.navigate(['/auth'])
  }


  getCart(){
    this.homeSvc.getCart().subscribe(res=>{
      console.log(res);
      if(res){

        this.cart = res
        this.items = res.cartItem
        this.items?.sort((a, b) => a.id - b.id);
        console.log(this.items);
        this.numeroCarrello = res?.cartItem.length;

      }

    })
  }

  putCart(idP:number, n:number){
    this.homeSvc.putCart(idP, n).subscribe(res =>{
      console.log(res);
      this.getCart()
    })
  }

  deleteFromCart(id:number){
this.homeSvc.deleteFromCart(id).subscribe(res=>{
  console.log(res);
  this.getCart()
})
  }
}
