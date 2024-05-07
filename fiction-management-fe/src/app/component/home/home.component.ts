import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule, RouterOutlet } from '@angular/router';
import { debounceTime } from 'rxjs';
import { Fiction } from '../../interface/fiction';
import { Tag } from '../../interface/tag';
import { FictionService } from '../../service/fiction.service';
import { TagService } from '../../service/tag.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    MatButtonModule,
    MatCardModule,
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatChipsModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  constructor(
    private ficitonService: FictionService,
    private tagService: TagService
  ) {
    this.getListFiction();
    this.getListTag();
    this.searchInputChanged();
  }

  fictions: Fiction[] = [];

  tags: Tag[] = [];

  tagId: number = -1;

  // Input Form
  searchInput = new FormControl('');

  getListFiction() {
    this.ficitonService.getFictions().subscribe((listFiciton) => {
      this.fictions = listFiciton;
    });
  }

  getListTag() {
    this.tagService.getTags().subscribe((tags) => (this.tags = tags));
  }

  searchInputChanged() {
    this.searchInput.valueChanges
      .pipe(debounceTime(1000))
      .subscribe(() => {
        this.filterFiction(null);
      });
  }

  filterFiction(tagId: number | null | undefined) {
    if (tagId !== null && tagId !== undefined) {
      this.tagId = tagId;
    }
    this.ficitonService
      .getFilterFiction(this.tagId, this.searchInput.value)
      .subscribe((fictions) => {
        this.fictions = fictions;
      });
  }
}
