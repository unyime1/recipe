//This module handles the user authentication service

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from './user.model';
import { environment } from '../../environments/environment';

//Auth response data model
export interface AuthResponseData {
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string,
  registered?: boolean

}


@Injectable({
  providedIn: 'root' 
})
export class AuthServiceService {
  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) { }

    // logic for user signup
  signUp(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.fireBaseApiKey,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(catchError(
      //run the error handling code
      this.handleError
    ), tap(resData => {
      //tap into the request and run handle auth code
     this.handleAuthentication( 
        resData.email, 
        resData.localId, 
        resData.idToken, 
        +resData.expiresIn
      )
    }));
  }

    // logic for user login
  login(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='  + environment.fireBaseApiKey,
      {
        email: email,
        password: password,
        returnSecureToken: true 
      }
    ).pipe(catchError(
      this.handleError
    ), tap(resData => {
      this.handleAuthentication(
         resData.email, 
         resData.localId, 
         resData.idToken, 
         +resData.expiresIn
       )
     }));
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');

    //clear timer if token timer is still active
    if(this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    // set timer to null
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    // auto logout users after token expiration
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout()
    }, expirationDuration)
  }

  autoLogin() {
    //logic for persistent login
    //get user data from local storage
    const userData : {
      email: string, 
      id: string, 
      _token: string, 
      _tokenExpirationDate: string
    } = JSON.parse(localStorage.getItem('userData'));
    
    //return null ifuser does not exist
    if (!userData) {
      return
    }

    //create new user object
    const loadedUser = new User(
      userData.email, 
      userData.id, 
      userData._token, 
      new Date(userData._tokenExpirationDate)
    )

    //emit the loaded user if token is valid
    if (loadedUser.token) {
      this.user.next(loadedUser);
      //activate auto logout
      const tokenExpirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(tokenExpirationDuration);
    }

  }

  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
    // handle user authentication
    //create token expiry date
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000)
    //create new user
    const user = new User(
      email, 
      userId, 
      token, 
      expirationDate
    );
    //emit new user to application
    this.user.next(user);
    //activate autologout
    this.autoLogout(expiresIn * 1000)
    //store stringified user data in local storage
    localStorage.setItem('userData', JSON.stringify(user))
  }


  
  // logic for error handling
  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occured';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage)
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email already exists! Please use another.';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'Your email or password is incorrect!';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'Your email or password is incorrect!';
        break;
      case 'USER_DISABLED':
        errorMessage = 'Your account has been suspended!';
        break;
    }
    return throwError(errorMessage);
  }
}
