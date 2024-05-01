import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { CommunicationService } from '../../service/communication.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(
    private communicationService: CommunicationService,
    private authService: AuthService,
    private router: Router
  ) {}

  username = new FormControl();
  password = new FormControl();

  onLogin() {
    this.authService
      .login(this.username.value, this.password.value)
      .subscribe((isLoggedIn: boolean) => {
        if (isLoggedIn) {
          this.router.navigate(['/home']);
          this.communicationService.triggerReload();
        } else {
          console.log('Login failed');
        }
      });
  }
}
