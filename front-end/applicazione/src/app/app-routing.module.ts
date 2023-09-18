import { AppLayoutComponent } from './pages/admin/layout/app.layout.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './pages/auth/auth.guard';
import { AdminGuard } from './pages/auth/admin.guard';

const routes: Routes = [
  {path:'', redirectTo:'home', pathMatch:'full'},
  { path: 'auth', loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule) },
 { path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule), canActivate: [AuthGuard] },
  { path: 'admin', loadChildren: () => import('./pages/admin/admin.module').then(m => m.AdminModule), canActivate: [AdminGuard] },
 /*  { path: 'single-product', loadChildren: () => import('./pages/home/single-product/single-product.module').then(m => m.SingleProductModule) }, */
  /* { path: 'users', loadChildren: () => import('./pages/admin/users/users.module').then(m => m.UsersModule) }, */
  /* { path: 'products', loadChildren: () => import('./pages/admin/products/products.module').then(m => m.ProductsModule) }, */
 /*  { path: 'categories', loadChildren: () => import('./pages/admin/categories/categories.module').then(m => m.CategoriesModule) }, */
/*   { path: 'register', loadChildren: () => import('./pages/auth/register/register.module').then(m => m.RegisterModule) },
   { path: 'login', loadChildren: () => import('./pages/auth/login/login.module').then(m => m.LoginModule) } */
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
