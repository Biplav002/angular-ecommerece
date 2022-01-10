import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';

import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { User } from '../common/User';

const headers = new HttpHeaders().set('Content-Type', 'application/json');
@Injectable({
  providedIn: 'root'
})
export class AuthService{
  private baseUrl = 'http://localhost:8080/auth/'; 
  user = new BehaviorSubject<User>(null);
  constructor(private http: HttpClient,  private router: Router){}
  signup(user: User): Observable<any>{
    //console.log('In AuthService');
    return this.http.post(this.baseUrl + 'signup', user, { headers, responseType: 'text'})
                    .pipe(catchError(this.handleError));
  }
  login(user: string, password: string){
    // console.log('In AuthService -  login');
    return this.http.post<any>(this.baseUrl + 'login', 
      {userName: user, password:password}, {headers})
      .pipe(catchError(this.handleError),
        map(userData => {
          sessionStorage.setItem("username", user);
          let tokenStr = "Bearer " + userData.token;
          console.log("Token---  " + tokenStr);
          sessionStorage.setItem("token", tokenStr);
          sessionStorage.setItem("roles", JSON.stringify(userData.roles));
          this.handleAuthentication(
            user,userData.email,
            userData.roles,
            userData.token
           
          );
          return userData;
        })
      ); 
  }

  logout(){
    sessionStorage.clear()
    this.router.navigate(['']);
  }

  isLoggedIn(): boolean{
    return sessionStorage.getItem('username') !== null;
  }

  private handleError(httpError: HttpErrorResponse) {
    let message:string = '';

    if (httpError.error instanceof ProgressEvent) {
      console.log('in progrss event')
      message = "Network error";
    }
    else {
      message = httpError.error.message;
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${httpError.status}, ` +
        `body was: ${httpError.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(message);
  }

  private handleAuthentication(
    userId: string,
    email: string,
    role: string[],
    
    token: string
    
  ) {
   // const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(userId,email, token, role);
    this.user.next(user);
    //this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }
}