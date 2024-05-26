import { Injectable, inject } from '@angular/core';
import { CanActivate, CanActivateFn, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ExpenseGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    if (typeof localStorage !== 'undefined') {
      const isUserLoggedIn = localStorage.getItem('isUserLoggedIn');
      if (isUserLoggedIn === 'true') {
        return true;
      } else {
        this.router.navigateByUrl('/login');
        return false;
      }
    }
    return false;
  }
}

export const expenseGuard: CanActivateFn = (route, state) => {
  return inject(ExpenseGuard).canActivate();
};
