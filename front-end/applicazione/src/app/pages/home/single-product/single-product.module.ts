import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingleProductRoutingModule } from './single-product-routing.module';
import { SingleProductComponent } from './single-product.component';
import { ButtonModule } from 'primeng/button';


@NgModule({
  declarations: [
    SingleProductComponent
  ],
  imports: [
    CommonModule,
    SingleProductRoutingModule,
    ButtonModule
  ]
})
export class SingleProductModule { }
