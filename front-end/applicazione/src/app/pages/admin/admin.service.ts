import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, throwError } from 'rxjs';
import { IAuthData } from 'src/app/interfaces/IAuthData';
import { ICategory } from 'src/app/interfaces/ICategory';
import { IProduct } from 'src/app/interfaces/IProduct';
import { IPage } from 'src/app/interfaces/IPage';
import { IUser } from 'src/app/interfaces/IUser';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  apiUrl:string = environment.url;
  adminUrl:string = this.apiUrl + 'admin';

  private authSubject = new BehaviorSubject<null | IAuthData>(null)
  user$ = this.authSubject.asObservable();

  constructor(private http:HttpClient, private router: Router) { }

  getUsers(){
    return this.http.get(this.adminUrl+'/users').pipe(
      catchError(error => {
        console.error(error);
        if (error.status) {
          console.error(error);
        }
        return throwError(error);
      }))
  }

  getCategories(){
    return this.http.get<ICategory[]>(this.adminUrl+'/categories').pipe(
      catchError(error => {
        console.error(error);
        if (error.status) {
          console.error(error);
        }
        return throwError(error);
      }))
  }

  postCategory(c:ICategory){
    return this.http.post<ICategory>(this.adminUrl+'/categories/new',c)
    .pipe(
      catchError(error => {
        console.error(error);
        if (error.status) {
          console.error(error);
        }
        return throwError(error);
      })
    );
  }

  deleteCategory(id:number){
    return this.http.delete(this.adminUrl+'/categories/'+id)
    .pipe(
      catchError(error => {
        console.error(error);
        if (error.status) {
          console.error(error);
        }
        return throwError(error);
      })
    );
  }

  toggleCategory(c:Partial<ICategory>){
    return this.http.put<ICategory>(this.adminUrl+'/categories/'+c.id, c)
  }


  getAllProducts(nPagina:number, size:number){
  return this.http.get<IPage>(this.adminUrl+'/products'+"?page="+nPagina+"&size="+size)
  .pipe(
    catchError(error => {
      console.error(error);
      if (error.status) {
        console.error(error);
      }
      return throwError(error);
    })
  );
  }

  searchProducts(pageNo: number, keyword: string){
    const url = `${this.adminUrl}/products/search-result/${pageNo}?keyword=${keyword}`;
    return this.http.get<IPage>(url);
  }



  getProduct(id:number){
    return this.http.get<IProduct>(this.adminUrl + '/products/' + id)
    .pipe(
      catchError(error => {
        console.error(error);
        if (error.status) {
          console.error(error);
        }
        return throwError(error);
      })
    );
  }

  postProduct(p:Partial<IProduct> ){
    return this.http.post<IProduct>(this.adminUrl + '/products/new', p)
    .pipe(
      catchError(error => {
        console.error(error);
        if (error.status) {
          console.error(error);
        }
        return throwError(error);
      })
    );
  }

  putProduct(p:Partial<IProduct>){
    return this.http.put<IProduct>(this.adminUrl + '/products/'+p.id, p)
    .pipe(
      catchError(error => {
        console.error(error);
        if (error.status) {
          console.error(error);
        }
        return throwError(error);
      })
    );
  }

  deleteProduct(id: number) {
    return this.http.delete(this.adminUrl + '/products/' + id)
      .pipe(
        catchError(error => {
          console.error(error);
          return throwError(error);
        })
      );
  }

}
