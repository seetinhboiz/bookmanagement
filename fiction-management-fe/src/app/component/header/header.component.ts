import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatIconModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserService
  ) {
    this.getUserByUsername();
  }

  username =
    typeof localStorage !== 'undefined' ? localStorage.getItem('username') : '';
  avatar = '';

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  getUserByUsername() {
    if (this.username !== null) {
      this.userService.getUserByUsername(this.username).subscribe((user) => {
        if (user.avatarUrl) {
          this.avatar = user.avatarUrl;
        }
      });
    }
  }
}
