import { CommonModule } from '@angular/common';
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
  imports: [MatIconModule, RouterLink, CommonModule],
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
    this.getUserByUsername();
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
  role = '';

  user: User | null = null;

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  getUserByUsername() {
    if (typeof sessionStorage !== 'undefined') {
      const storedUsername = sessionStorage.getItem('username');
      if (storedUsername) {
        this.userService.getUserByUsername(storedUsername).subscribe((user) => {
          console.log('this called')
          this.user = user;
          if (user?.id) {
            if (typeof sessionStorage !== 'undefined') {
              sessionStorage.setItem('id', user.id.toString());
            }
          }
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
          if (user?.role) {
            this.role = user.role;
            if (typeof sessionStorage !== 'undefined') {
              sessionStorage.setItem('role', user.role);
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
