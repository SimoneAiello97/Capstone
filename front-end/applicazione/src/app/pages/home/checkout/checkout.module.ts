import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckoutRoutingModule } from './checkout-routing.module';
import { CheckoutComponent } from './checkout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxStripeModule } from 'ngx-stripe';
import { environment } from 'src/environments/environment.development';
import { HttpClientModule } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';



@NgModule({
  declarations: [
    CheckoutComponent
  ],
  imports: [
    CommonModule,
    CheckoutRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxStripeModule.forRoot(environment.stripe.publicKey),
    HttpClientModule,
    TableModule,
    ButtonModule,
    DialogModule
  ]
})
export class CheckoutModule { }
