import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { ButtonModule } from 'primeng/button';
import { ModelComponent } from 'src/app/model/model.component';
import { AnimateModule } from 'primeng/animate';


@NgModule({
  declarations: [
    AuthComponent,
    ModelComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ButtonModule,
    AnimateModule
  ]
})
export class AuthModule { }
