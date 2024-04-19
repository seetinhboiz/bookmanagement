import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  isUserLoggedIn: boolean = false;
  loginStatusChange: Subject<boolean> = new Subject<boolean>();

  login(userName: string, password: string) {
    this.isUserLoggedIn = userName === 'admin' && password === '123';

    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(
        'isUserLoggedIn',
        this.isUserLoggedIn ? 'true' : 'false'
      );

      if (this.isUserLoggedIn) {
        console.log('Loggin successed');
        localStorage.setItem('username', userName);
      } else {
        console.log('Loggin failed');
      }
    }

    this.loginStatusChange.next(this.isUserLoggedIn);
  }

  logout(): void {
    this.isUserLoggedIn = false;
    localStorage.clear();
    this.loginStatusChange.next(this.isUserLoggedIn);
  }
}
