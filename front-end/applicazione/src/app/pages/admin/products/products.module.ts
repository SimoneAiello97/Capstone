import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { TableModule } from 'primeng/table';


@NgModule({
  declarations: [
    ProductsComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    TableModule
  ]
})
export class ProductsModule { }
