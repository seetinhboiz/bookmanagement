import { Injectable, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ExpenseGuard {
  constructor(private router: Router) {}

  checkLogin() {
    const isLogin = localStorage.getItem('isUserLoggedIn');
    if (isLogin !== null && isLogin === 'true') {
      this.router.navigateByUrl('/home');
      return true;
    }
    this.router.navigateByUrl('/login');
    return false;
  }
}

export const expenseGuard: CanActivateFn = (route, state) => {
  return inject(ExpenseGuard).checkLogin();
};
