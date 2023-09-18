import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingleProductRoutingModule } from './single-product-routing.module';
import { SingleProductComponent } from './single-product.component';


@NgModule({
  declarations: [
    SingleProductComponent
  ],
  imports: [
    CommonModule,
    SingleProductRoutingModule
  ]
})
export class SingleProductModule { }
