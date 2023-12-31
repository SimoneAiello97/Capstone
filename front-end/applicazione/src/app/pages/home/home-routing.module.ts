import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';

const routes: Routes = [{ path: '', component: HomeComponent },
{ path: 'single-product/:id', loadChildren: () => import('./single-product/single-product.module').then(m => m.SingleProductModule) },
{ path: 'cart', loadChildren: () => import('./cart/cart.module').then(m => m.CartModule) },
{ path: 'check-out', loadChildren: () => import('./checkout/checkout.module').then(m => m.CheckoutModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
