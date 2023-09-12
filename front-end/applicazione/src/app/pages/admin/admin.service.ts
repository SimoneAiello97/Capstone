import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, throwError } from 'rxjs';
import { IAuthData } from 'src/app/interfaces/IAuthData';
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

  deleteUser(id:number){
    return this.http.delete(this.adminUrl+'/users/'+id).pipe(
      catchError(error => {
        console.error(error);
        if (error.status) {
          console.error(error);
        }
        return throwError(error);
      })
    );
  }
}
