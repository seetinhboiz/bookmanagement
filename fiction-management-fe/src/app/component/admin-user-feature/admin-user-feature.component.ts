import { Component, Inject, OnInit } from '@angular/core';
import { User } from '../../interface/user';
import { UserService } from '../../service/user.service';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-admin-user-feature',
  standalone: true,
  imports: [MatIconModule, MatTableModule, MatButtonModule],
  templateUrl: './admin-user-feature.component.html',
  styleUrl: './admin-user-feature.component.css',
})
export class AdminUserFeatureComponent implements OnInit {
  displayedColumns: string[] = ['id', 'username', 'role', 'avatar', 'action'];

  dataUsers: User[] = [];

  userById: User | undefined;

  constructor(private userService: UserService, public dialog: MatDialog) {}

  getAllUsers() {
    return this.userService.getUsers().subscribe((users) => {
      this.dataUsers = users;
    });
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe(() => {
      this.getAllUsers();
    });
  }

  openDialog(user?: User) {
    this.dialog.open(UserDialog, {
      minWidth: '400px',
      data: { user: user },
    });

    this.dialog.afterAllClosed.subscribe(() => {
      this.getAllUsers();
    });
  }

  ngOnInit(): void {
    this.getAllUsers();
  }
}

// Dialog Component
@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'dialog-user.html',
  styleUrl: './admin-user-feature.component.css',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
  ],
})
export class UserDialog {

  constructor(
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public userById: { user?: User }
  ) {
    console.log(this.userById.user?.id);
  }

  dialogTitle = this.userById? 'Update User' : 'Create User';

  username = new FormControl(this.userById.user?.username || '');
  password = new FormControl(this.userById.user?.password || '');
  avatar = new FormControl(this.userById.user?.avatarUrl || '');
  role = new FormControl(this.userById.user?.role || '');

  createUser(user: User) {
    this.userService.createUser(user).subscribe();
  }

  updadeUser(user: User) {
    this.userService.updateUser(user).subscribe();
  }

  onSubmit() {
    if (this.userById) {
      const updateUser: User = {
        id: this.userById.user?.id,
        username: this.username.value || '',
        password: this.password.value || '',
        avatarUrl: this.avatar.value || '',
        role: this.role.value || '',
      };
      this.updadeUser(updateUser);
    } else {
      const newUser: User = {
        username: this.username.value || '',
        password: this.password.value || '',
        avatarUrl: this.avatar.value || '',
        role: this.role.value || '',
      };
      this.createUser(newUser);
    }
  }
}
