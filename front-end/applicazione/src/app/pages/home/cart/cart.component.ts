import { of } from 'rxjs';
import { ProductsRoutingModule } from './../../admin/products/products-routing.module';
import { Component } from '@angular/core';
import { HomeService } from '../home.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {

  items:any[]|undefined
  cart:any|undefined

  constructor(private homeSvc:HomeService, private router:Router){}

  ngOnInit(){
    this.getCart()
  }

  getCart(){
    this.homeSvc.getCart().subscribe(res=>{
      console.log(res);
      this.cart = res
      this.items = res.cartItem

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
