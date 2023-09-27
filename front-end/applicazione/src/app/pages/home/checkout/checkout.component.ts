import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { OnInit, ViewChild } from '@angular/core';
import { StripeCardNumberComponent, StripeService } from 'ngx-stripe';
import {
  PaymentIntent,
  StripeCardElementOptions,
  StripeElementsOptions,
} from '@stripe/stripe-js';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import * as StripeCheckoutStatic from 'ngx-stripe'; // Importa Stripe
import { HomeService } from '../home.service';
import { Router } from '@angular/router';
import { IUser } from 'src/app/interfaces/IUser';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent {

  cart:any
  items!:any[]
  paymentHandler: any = null;
  user:IUser |null|undefined

  stripeAPIKey: any = 'pk_test_51NsnFeJDJmLsYj1ckercN8Aiq0C2Pci55cASU1KoH0BDKa8QYpHLGuqiSqJYCG2ZS6lsmchLlvwYduIRRjlmCPov006aFoHXcO';

  constructor(private homeSvc:HomeService,private router:Router) {}
  ngOnInit() {
    this.invokeStripe();
    this.getCart()
    this.homeSvc.getSingleUser().subscribe(user=>this.user = user)

  }

  getCart(){
    this.homeSvc.getCart().subscribe(res=>{
      console.log(res);
      this.cart = res
      this.items = res.cartItem
    })
  }

  makePayment(amount: any) {
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: this.stripeAPIKey,
      locale: 'auto',

      token: (stripeToken: any) =>{
        console.log(stripeToken);

        //alert('Pagamento effettuato');
        this.addOrder()
      },

    });
console.log(paymentHandler.open);

    paymentHandler.open({
      name: 'E Store',
      description: 'Tranquillo il pagamento e finto',
      amount: amount * 100,
    });


  }

  addOrder(){
    this.homeSvc.addOrder().subscribe(res=>{
      console.log(res);
      this.router.navigate(['/']);
      alert("Ordine effettuato con successo")
    })
  }


  invokeStripe() {
    if (!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement('script');
      script.id = 'stripe-script';
      script.type = 'text/javascript';
      script.src = 'https://checkout.stripe.com/checkout.js';
      script.onload = () => {
          this.paymentHandler = (<any>window).StripeCheckout.configure({
            key: this.stripeAPIKey,
            locale: 'auto',
            token: function (stripeToken: any) {
              console.log(stripeToken);
              alert('Payment has been successful!');
            },
          });
        }
      window.document.body.appendChild(script);
    }
  }
}
