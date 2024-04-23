import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { User } from '../interface/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  urlLogin = 'http://localhost:8080/api/login';

  isUserLoggedIn: boolean = false;
  loginStatusChange: Subject<boolean> = new Subject<boolean>();

  login(userNameInput: string, passwordInput: string): Observable<boolean> {
    const user: User = { username: userNameInput, password: passwordInput };

    return this.http
      .post<User>(this.urlLogin, user, { observe: 'response' })
      .pipe(
        map((response: HttpResponse<User>) => response.status === 200),
        tap((isLoggedIn) => {
          this.isUserLoggedIn = isLoggedIn;
          this.loginStatusChange.next(this.isUserLoggedIn);

          if (typeof localStorage !== 'undefined') {
            localStorage.setItem(
              'isUserLoggedIn',
              isLoggedIn ? 'true' : 'false'
            );
            if (isLoggedIn) {
              localStorage.setItem('username', userNameInput);
            }
          }
        })
      );
  }

  logout(): void {
    this.isUserLoggedIn = false;
    localStorage.clear();
    this.loginStatusChange.next(this.isUserLoggedIn);
  }
}
