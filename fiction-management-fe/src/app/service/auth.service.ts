import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  isUserLoggedIn: boolean = false;

  login(userName: string, password: string) {
    this.isUserLoggedIn = userName === 'admin' && password === '123';

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

  logout(): void {
    this.isUserLoggedIn = false;
    localStorage.removeItem('isUserLoggedIn');
  }
}
