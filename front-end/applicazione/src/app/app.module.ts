import { AppLayoutModule } from './pages/admin/layout/app.layout.module';
import { AppLayoutComponent } from './pages/admin/layout/app.layout.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ModelComponent } from './model/model.component';
import { AdminInterceptor } from './pages/admin/admin.interceptor';



@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    AppLayoutModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AdminInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
