import { Component, HostListener, OnDestroy } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    HeaderComponent,
    FooterComponent,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnDestroy {
  isLogin: string | null = 'false';
  loginSubscription: Subscription = new Subscription();

  constructor(private authService: AuthService) {
    if (typeof sessionStorage !== 'undefined') {
      this.isLogin = sessionStorage.getItem('isUserLoggedIn');
    }

    this.loginSubscription = this.authService.loginStatusChange.subscribe(
      (isLoggedIn: boolean) => {
        this.isLogin = isLoggedIn.toString();
      }
    );
  }

  ngOnDestroy() {
    this.loginSubscription.unsubscribe();
  }

  @HostListener('window:beforeunload', ['$event'])
  onBeforeUnload() {
    if (typeof localStorage !== 'undefined') {
      localStorage.clear();
    }
    // if (typeof sessionStorage !== 'undefined') {
    //   sessionStorage.clear();
    // }
  }
}
