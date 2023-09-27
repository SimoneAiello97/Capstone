import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingleProductRoutingModule } from './single-product-routing.module';
import { SingleProductComponent } from './single-product.component';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CarouselModule } from 'primeng/carousel';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { BadgeModule } from 'primeng/badge';
import { NgxImageZoomModule } from 'ngx-image-zoom';

@NgModule({
  declarations: [
    SingleProductComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    SingleProductRoutingModule,
    ButtonModule,
    CardModule,
    CarouselModule,
    AvatarModule,
    AvatarGroupModule,
    BadgeModule,
    NgxImageZoomModule

  ]
})
export class SingleProductModule { }
