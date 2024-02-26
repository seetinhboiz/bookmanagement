import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { User } from '../../interface/user';
import { S3Service } from '../../service/s3.service';
import { UserService } from '../../service/user.service';

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

  constructor(
    private userService: UserService,
    private s3Service: S3Service,
    public dialog: MatDialog
  ) {}

  getAllUsers() {
    return this.userService.getUsers().subscribe((users) => {
      this.dataUsers = users;
    });
  }

  deleteUser(user: User) {
    if (user.id) {
      this.userService.deleteUser(user.id).subscribe(() => {
        this.getAllUsers();
      });
    }
  }

  deleteFile(fileName: string) {
    this.s3Service.deleteFile(fileName).subscribe();
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
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
  ],
})
export class UserDialog {
  constructor(
    private userService: UserService,
    private s3Service: S3Service,
    public dialogRef: MatDialogRef<UserDialog>,
    @Inject(MAT_DIALOG_DATA)
    public userById: { user?: User }
  ) {
    if (this.userById.user) {
      this.getAvatarUrl(this.userById.user.avatarUrl);
    }
  }

  dialogTitle = this.userById.user ? 'Update User' : 'Create User';

  username = new FormControl(this.userById.user?.username || '');
  password = new FormControl(this.userById.user?.password || '');
  role = new FormControl(this.userById.user?.role || '');

  avatarUrl: string = '';

  isAvatar: boolean = this.userById.user ? true : false;

  selectedFile: File | undefined;

  isUpdateFile: boolean = false;

  fileName: string | undefined = this.userById
    ? this.userById.user?.avatarUrl
    : '';

  createUser() {
    const updateUser: User = {
      username: this.username.value || '',
      password: this.password.value || '',
      avatarUrl: this.fileName || '',
      role: this.role.value || '',
    };
    this.userService.createUser(updateUser).subscribe(() => {
      this.dialogRef.close();
    });
  }

  updateUser() {
    const newUser: User = {
      id: this.userById.user?.id,
      username: this.username.value || '',
      password: this.password.value || '',
      avatarUrl: this.fileName || '',
      role: this.role.value || '',
    };
    this.userService.updateUser(newUser).subscribe(() => {
      this.dialogRef.close();
    });
  }

  onChange(event: any) {
    this.isUpdateFile = true;
    this.selectedFile = event.target.files[0];
  }

  uploadFile() {
    if (this.selectedFile) {
      this.s3Service.uploadFile(this.selectedFile).subscribe((fName) => {
        this.fileName = fName;
        if (this.userById.user) {
          this.updateUser();
        } else {
          this.createUser();
        }
      });
    } else {
      console.log('No file selected');
    }
  }

  getAvatarUrl(fileName: string) {
    this.s3Service
      .getFileUrl(fileName)
      .subscribe((fname) => (this.avatarUrl = fname));
  }

  onSubmit() {
    if (this.isUpdateFile) {
      this.uploadFile();
    } else {
      this.updateUser();
    }
  }

  // Drag drop image
  dragging = false;

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

  onFileSelected(event: Event) {
    const files = (event.target as HTMLInputElement).files;
    this.handleFiles(files);
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
}
