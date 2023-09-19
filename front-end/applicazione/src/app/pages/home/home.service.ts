import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IProduct } from 'src/app/interfaces/IProduct';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  apiUrl:string = environment.url;
  productUrls:string = this.apiUrl + 'customers/products';

  constructor(private http:HttpClient, private router: Router) { }


  filterHighPrice(){
    return this.http.get<IProduct[]>(this.productUrls+'/highPrice');
  }

  filterLowPrice(){
    return this.http.get(this.productUrls+'/lowPrice');
  }

  filterCategory(id:number){
    return this.http.get(this.productUrls+'/inCategory/'+id);
  }

  relatedProducts(id:number){
    return this.http.get(this.productUrls+'/related/'+id);
  }
}
