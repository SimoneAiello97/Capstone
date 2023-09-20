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

  constructor(private homeSvc:HomeService, private router:Router){}

  ngOnInit(){
    this.getCart()
  }

  getCart(){
    this.homeSvc.getCart().subscribe(res=>{
      console.log(res);
      this.items = res.cartItem
    })
  }
}
