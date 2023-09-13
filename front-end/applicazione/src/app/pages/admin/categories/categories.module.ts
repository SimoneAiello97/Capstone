import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoriesComponent } from './categories.component';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CategoriesComponent
  ],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    FormsModule
  ]
})
export class CategoriesModule { }
