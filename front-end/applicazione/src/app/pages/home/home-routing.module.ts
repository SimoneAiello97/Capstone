import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';

const routes: Routes = [{ path: '', component: HomeComponent },
{ path: 'single-product/:id', loadChildren: () => import('./single-product/single-product.module').then(m => m.SingleProductModule) },];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
