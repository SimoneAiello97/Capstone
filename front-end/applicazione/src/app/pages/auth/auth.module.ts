import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { ButtonModule } from 'primeng/button';
import { ModelComponent } from 'src/app/model/model.component';
import { CarouselModule } from 'primeng/carousel';
import { TagModule } from 'primeng/tag';
import { NgbCarousel, NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbRatingConfig, NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { AvatarModule } from 'primeng/avatar';
import { CardModule } from 'primeng/card';


@NgModule({

  declarations: [
    AuthComponent,
    ModelComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ButtonModule,
    CarouselModule,
    TagModule,
    NgbCarousel,
    NgbCarouselModule,
    NgbRatingModule,
    AvatarModule,
    CardModule
  ]
})
export class AuthModule { }
