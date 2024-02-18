import { Component, Inject, OnInit } from '@angular/core';
import { TagService } from '../../service/tag.service';
import { Tag } from '../../interface/tag';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
} from '@angular/material/dialog';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AsyncPipe } from '@angular/common';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-admin-tag-feature',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatTooltipModule,
    MatButtonModule,
    MatDialogModule,
  ],
  templateUrl: './admin-tag-feature.component.html',
  styleUrl: './admin-tag-feature.component.css',
})
export class AdminTagFeatureComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'action'];

  dataTags: Tag[] = [];

  tagById: Tag | undefined;

  constructor(private tagService: TagService, public dialog: MatDialog) {}

  getAllTags() {
    return this.tagService.getTags().subscribe((tags) => {
      this.dataTags = tags;
    });
  }

  deleteTag(id: number) {
    this.tagService.deleteTag(id).subscribe(() => {
      this.getAllTags();
    });
  }

  openDialog(tag?: Tag) {
    this.dialog.open(DialogContentExampleDialog, {
      minWidth: '400px',
      data: { tags: this.dataTags, tag: tag },
    });

    this.dialog.afterAllClosed.subscribe(() => {
      this.getAllTags();
    });
  }

  ngOnInit(): void {
    this.getAllTags();
  }
}

// Dialog Component
@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'dialog-tag.html',
  styleUrl: './admin-tag-feature.component.css',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    AsyncPipe,
    MatInputModule,
    CommonModule
  ],
})
export class DialogContentExampleDialog implements OnInit {
  dialogTitle = 'Create Tag';
  name = new FormControl<string | Tag>('');

  // Optional tag
  tags: Tag[] = [];
  options: Tag[] = [];

  filteredOptions: Observable<Tag[]> = new Observable<Tag[]>();
  private _filter(name: string): Tag[] {
    const filterValue = name.toLowerCase();

    return this.options.filter((option) =>
      option.name.toLowerCase().includes(filterValue)
    );
  }

  displayFn(tag: Tag | string): string {
    if (typeof tag === 'string') {
      return tag;
    }
    return tag && tag.name ? tag.name : '';
  }

  createTag(tag: Tag) {
    if (tag.name.trim().length > 0) {
      this.tagService.createtag(tag).subscribe();
    }
  }

  editTag(tag: Tag) {
    this.tagService.updateTag(tag).subscribe();
  }

  constructor(
    private tagService: TagService,
    @Inject(MAT_DIALOG_DATA) public data: { tags: Tag[]; tag?: Tag }
  ) {
    if (this.data.tag) {
      this.dialogTitle = 'Update Tag';
      this.name.setValue(data.tag?.name || null);
    }
  }

  onSubmit() {
    if (typeof this.name.value === 'string') {
      if (this.data.tag) {
        this.data.tag.name = this.name.value;
        this.editTag(this.data.tag);
      } else {
        const newTag: Tag = { id: null, name: this.name.value };
        this.createTag(newTag);
      }
    } else {
      console.log('Invalid name', this.name.value);
    }
  }

  ngOnInit() {
    this.tags = this.data.tags;
    this.options = this.tags;
    this.filteredOptions = this.name.valueChanges.pipe(
      startWith(''),
      map((value) => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filter(name as string) : this.options.slice();
      })
    );
  }
}
