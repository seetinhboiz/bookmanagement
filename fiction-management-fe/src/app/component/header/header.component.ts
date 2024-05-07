import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../../interface/user';
import { AuthService } from '../../service/auth.service';
import { CommunicationService } from '../../service/communication.service';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatIconModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit, OnDestroy {
  private reloadSubscription: Subscription = new Subscription();

  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserService,
    private communicationService: CommunicationService
  ) {}

  ngOnInit() {
    if (typeof sessionStorage !== 'undefined') {
      this.username = sessionStorage.getItem('username') || '';
      this.avatar = sessionStorage.getItem('avatar') || '';
    }

    this.reloadSubscription =
      this.communicationService.reloadObservable.subscribe(() => {
        this.reload();
      });
  }

  ngOnDestroy(): void {
    this.reloadSubscription.unsubscribe();
  }

  username = '';
  avatar = '';

  user: User | null = null;

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  getUserByUsername() {
    if (typeof localStorage !== 'undefined') {
      const storedUsername = localStorage.getItem('username');
      if (storedUsername) {
        this.userService.getUserByUsername(storedUsername).subscribe((user) => {
          this.user = user;
          if (user?.username) {
            this.username = user.username;
            if (typeof sessionStorage !== 'undefined') {
              sessionStorage.setItem('username', user.username);
            }
          }
          if (user?.avatarUrl) {
            this.avatar = user.avatarUrl;
            if (typeof sessionStorage !== 'undefined') {
              sessionStorage.setItem('avatar', user.avatarUrl);
            }
          }
        });
      }
    }
  }

  reload() {
    this.getUserByUsername();
  }
}
