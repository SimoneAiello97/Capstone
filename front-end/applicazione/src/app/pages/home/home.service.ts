import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IPage } from 'src/app/interfaces/IPage';
import { IProduct } from 'src/app/interfaces/IProduct';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  apiUrl:string = environment.url;
  productUrls:string = this.apiUrl + 'customers/products';
  cartUrl:string = this.apiUrl + 'customers';

  ordineEffetuato:string ='ordine effettuato'
  constructor(private http:HttpClient, private router: Router) { }


  filterHighPrice(){
    return this.http.get<IProduct[]>(this.productUrls+'/highPrice');
  }

  filterLowPrice(){
    return this.http.get<IProduct[]>(this.productUrls+'/lowPrice');
  }

  filterCategory(id:number){
    return this.http.get<IProduct[]>(this.productUrls+'/inCategory/'+id);
  }

  relatedProducts(id:number){
    return this.http.get<IProduct[]>(this.productUrls+'/related/'+id);
  }

  getCart(){
    return this.http.get<any>(this.cartUrl + '/cart')
  }

  addToCart(id:number){
    return this.http.post<any>(this.cartUrl + '/addToCart/'+ id, id)
  }

  putCart(idP:number, n:number){
    return this.http.put<any>(this.cartUrl + '/updateCart/'+ idP+ '/' + n, n)
  }

  deleteFromCart(id:number){
    return this.http.delete<any>(this.cartUrl + '/deleteFromCart/' + id)
  }

  addOrder(){
    return this.http.post<any>(this.cartUrl + '/addOrder', this.ordineEffetuato)
  }

  getAllOrders(){
    return this.http.get<any>(this.cartUrl+"/allOrders");
  }
}
