import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Fiction } from '../../interface/fiction';
import { FictionService } from '../../service/fiction.service';
import { S3Service } from '../../service/s3.service';

@Component({
  selector: 'app-admin-fiction-feature',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatTableModule, RouterLink],
  templateUrl: './admin-fiction-feature.component.html',
  styleUrl: './admin-fiction-feature.component.css',
})
export class AdminFictionFeatureComponent {
  constructor(private fictionService: FictionService, private s3Service: S3Service) {
    this.getAllFictions();
  }

  displayedColumns: string[] = [
    'id',
    'name',
    'count view',
    'cover',
    'author',
    'status',
    'action',
  ];

  dataFiction: Fiction[] = [];

  getAllFictions() {
    this.fictionService
      .getFictions()
      .subscribe((fictions) => (this.dataFiction = fictions));
  }

  deleteFiction(fiction: Fiction) {
    if (fiction.id) {
      this.fictionService.deleteFiction(fiction.id).subscribe(() => {
        this.getAllFictions();
      });
    }
  }
}
