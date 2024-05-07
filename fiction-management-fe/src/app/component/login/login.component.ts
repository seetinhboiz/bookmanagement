import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs';
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
    CommonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(
    private communicationService: CommunicationService,
    private authService: AuthService,
    private router: Router
  ) {
    this.signupForm.controls.newUsername.valueChanges
      .pipe(debounceTime(500))
      .subscribe(() => {
        this.checkUsernameIsUnique();
      });
  }

  // Form Login
  username = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);

  // Form Sign up
  signupForm = new FormGroup({
    newUsername: new FormControl('', [Validators.required]),
    newPassword: new FormControl('', [Validators.required]),
    newRole: new FormControl(''),
  });

  // Image Drag Drop
  dragging: boolean = false;
  isAvatar: boolean = false;
  selectedFile: File | undefined;
  avatarUrl: string = '';

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.dragging = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.dragging = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.dragging = false;
    const files = event.dataTransfer?.files || null;
    this.handleFiles(files);
  }

  onFileSelected(event: any) {
    const files = (event.target as HTMLInputElement).files;
    this.handleFiles(files);
    this.isAvatar = true;
    this.selectedFile = event.target.files[0];
  }

  handleFiles(files: FileList | null) {
    if (!files) return;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.type.match('image.*')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const imageUrl = e.target?.result as string;
          this.avatarUrl = imageUrl;
        };
        reader.readAsDataURL(file);
      }
    }
  }

  // Login
  onLogin() {
    if (this.username.value && this.password.value) {
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

  // Sign up
  onSignup() {}

  checkUsernameIsUnique() {
    if (this.signupForm.controls.newUsername.value) {
      this.authService
        .checkUsernameIsUnique(this.signupForm.controls.newUsername.value)
        .subscribe((response) => console.log(response));
    }
  }
}
