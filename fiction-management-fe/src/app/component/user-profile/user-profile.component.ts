import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Fiction } from '../../interface/fiction';
import { User } from '../../interface/user';
import { FictionService } from '../../service/fiction.service';
import { UserService } from '../../service/user.service';
import { UserDialog } from '../admin-user-feature/admin-user-feature.component';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    CommonModule,
    MatDividerModule,
    RouterLink,
  ],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css',
})
export class UserProfileComponent {
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private fictionService: FictionService,
    public dialog: MatDialog
  ) {
    this.getUserById();
  }

  userById: User | null = null;

  fictionsByUserId: Fiction[] = [];

  username =
    typeof localStorage !== 'undefined' ? localStorage.getItem('username') : '';

  getUserById() {
    const idParam = Number(this.route.snapshot.paramMap.get('id'));
    this.userService.getUserById(idParam).subscribe((user) => {
      this.userById = user;
      this.getFictionsByUserId(idParam);
    });
  }

  getFictionsByUserId(userId: number) {
    this.fictionService.getFictionByUserId(userId).subscribe((fictions) => {
      this.fictionsByUserId = fictions;
    });
  }

  onOPenDialog() {
    this.dialog.open(UserDialog, {
      minWidth: '400px',
      data: { user: this.userById },
    });

    this.dialog.afterAllClosed.subscribe(() => {
      this.getUserById();
    });
  }
}
