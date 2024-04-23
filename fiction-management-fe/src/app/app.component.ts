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
  isLogin: boolean = false;
  loginSubscription: Subscription = new Subscription();

  constructor(private authService: AuthService) {
    this.isLogin = authService.isUserLoggedIn;

    this.loginSubscription = this.authService.loginStatusChange.subscribe(
      (isLoggedIn: boolean) => {
        this.isLogin = isLoggedIn;
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
  }
}
