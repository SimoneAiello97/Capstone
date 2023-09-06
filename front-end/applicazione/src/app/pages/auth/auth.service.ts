import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, catchError, map, tap, throwError } from 'rxjs';
import { IAuthData } from 'src/app/interfaces/IAuthData';
import { ISignIn } from 'src/app/interfaces/ISignIn';
import { ISignUp } from 'src/app/interfaces/ISignUp';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  jwtHlper:JwtHelperService = new JwtHelperService()
  apiUrl:string = environment.url
  SignUpUrl:string = this.apiUrl + 'auth/register';
  SignInUrl:string = this.apiUrl + 'auth/login';
  private authSubject = new BehaviorSubject<null | IAuthData>(null)
  user$ = this.authSubject.asObservable();
  isLoggedIn$ = this.user$.pipe(map(user => Boolean(user)));

  private userSubject = new BehaviorSubject<null| ISignUp>(null);
  userLogged$ = this.userSubject.asObservable();

  constructor(private http:HttpClient, private router: Router) { this.restoreUser()}

  signUp(data:ISignUp){

    return this.http.post<IAuthData>(this.SignUpUrl, data).pipe(
      catchError(error => {
        console.error(error);
        console.error(error.message);

        if (error.status) {
          alert(error.message)
        }
        return throwError(error);
      })
    );
  }

  signIn(dati:ISignIn){
    return this.http.post<IAuthData>(this.SignInUrl, dati)
    .pipe(tap(data =>{
      this.authSubject.next(data);
      localStorage.setItem('user', JSON.stringify(data));
      let user = localStorage.getItem('user');
      console.log(user);
      const expDate = this.jwtHlper.getTokenExpirationDate(data.accessToken) as Date;
      this.autoLogout(expDate);
    }))
    .pipe(catchError(error => {
      if (error.status) {
        alert(error.message)
      }
      return throwError(error);
    }))
  }

  logout(){
    this.authSubject.next(null);
    localStorage.removeItem('user')
    localStorage.removeItem('userLogged')
    this.router.navigate(['/login']);
  }
  autoLogTimer:any

  autoLogout(expDate:Date){
    const expMs:number = expDate.getTime() - new Date().getTime();

    this.autoLogTimer = setTimeout(() => {this.logout()}, expMs);
  }

  restoreUser(){
    const userJson = localStorage.getItem('user');
    const dataAttuale = Date.now()
    if(!userJson){
      return
    }
    const user:IAuthData = JSON.parse(userJson);
    if(this.jwtHlper.isTokenExpired(user.accessToken)){
      return
    }
    this.authSubject.next(user)
    console.log('Sei attualmente loggato');
  }
}
