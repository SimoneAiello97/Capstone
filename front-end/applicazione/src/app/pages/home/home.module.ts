import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { CardModule } from 'primeng/card';
import { PaginatorModule } from 'primeng/paginator';
import { RouterModule } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { TreeSelectModule } from 'primeng/treeselect';
import { DropdownModule } from 'primeng/dropdown';

import { BadgeModule } from 'primeng/badge';
import { HeroComponent } from './components/hero/hero.component';



@NgModule({
  declarations: [
    HomeComponent,
    HeroComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ButtonModule,
    AvatarModule,
    AvatarGroupModule,
    CardModule,
    PaginatorModule,
    RouterModule,
    InputTextModule,
    TreeSelectModule,
    DropdownModule,
    BadgeModule
  ]
})
export class HomeModule { }
