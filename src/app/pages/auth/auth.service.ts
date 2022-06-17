import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';
import { map, take, switchMap, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';


const BACKEND_URL ='http://localhost:3000/api/auth';

interface AuthData {
  mail: string,
  password: string,
  name?: string,
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _token: string;
  private tokenTimer: any;
  private isAuthenticated = false;
  private _authStatusListener = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient, private router: Router) { }


  get token() {
    return this._token;
  }

  get authStatusListener() {
    return this._authStatusListener.asObservable();
  }

  get isAuth() {
    return this.isAuthenticated;
  }

  createUser(
    mail: string,
    name: string,
    password: string,

  ) {
    const authData: AuthData = {
      mail: mail,
      password: password,
      name: name,

    };
    // this.http.post(`${BACKEND_URL}/signup`, authData)
    //   .subscribe(response => {
    //     console.log(response);
    //     this.router.navigateByUrl('login');
    //   }, error => {
    //     console.log(error);

    //   });
    return this.http.post<{ message: string }>(`${BACKEND_URL}/signup`, authData)
      .pipe(take(1));
  }

  login(mail: string, password: string) {
    console.log('in the set');
    const authData: AuthData = {
      mail: mail,
      password: password,
    }
    return this.http.post<{ token: string, expiresIn: number ,name:string, id:number}>(`${BACKEND_URL}/login`, authData)
      .pipe(tap(response => {
    
        const token = response.token;
        if (token) {
          const expiresInDuration = response.expiresIn;
          this.setAuthTimer(expiresInDuration);
          this._token = token;
          this.isAuthenticated = true;
          this._authStatusListener.next(true);
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
          this.saveAuthData(token, expirationDate,response.name );
          this.router.navigateByUrl('/home');
        }
      }));
  }

  autoAuthUser() {
    const authInfo = this.getAuthData();
    if (!authInfo) {
      return;
    }
    const now = new Date();
    // const isInFuture = authInfo.expirationDate > now;
    const expiresIn = authInfo.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this._token = authInfo.token;
      this.isAuthenticated = true;
      this.setAuthTimer(expiresIn / 1000);
      this._authStatusListener.next(true);
    }
  }

  logout() {
    this._token = '';
    this.isAuthenticated = false;
    this._authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigateByUrl('/login');
  }

  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(token: string, expirationDate: Date, name:string) {
    localStorage.setItem('name',name);
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
  }

   getAuthData() {
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    const name =localStorage.getItem("name");
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      name:name,
    }
  }

}
