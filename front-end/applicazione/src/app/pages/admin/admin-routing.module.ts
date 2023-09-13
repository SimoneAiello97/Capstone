import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AppLayoutComponent } from './layout/app.layout.component';


const routes: Routes = [
  { path: '', component: AppLayoutComponent,
  children:[
    { path: '', component: AdminComponent},
    { path: 'categories', loadChildren: () => import('./categories/categories.module').then(m => m.CategoriesModule) },
    { path: 'products', loadChildren: () => import('./products/products.module').then(m => m.ProductsModule) },
  ]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
