import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, switchMap, take } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { AdminService } from './admin.service';

@Injectable()
export class AdminInterceptor implements HttpInterceptor {

  constructor(private authSvc:AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.authSvc.user$.pipe(take(1), switchMap(user => {
     /*  console.log(user); */
      if(!user){
        return next.handle(request)
      }
      const newReq = request.clone({
        headers:request.headers.append('Authorization', `Bearer ${user.accessToken}`)
      })
      return next.handle(request)
      })
      );
  }
}
