import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { AsyncPipe, CommonModule, Location } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatAutocompleteModule,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute } from '@angular/router';
import { Observable, map, startWith } from 'rxjs';
import { Fiction } from '../../interface/fiction';
import { Tag } from '../../interface/tag';
import { TagService } from '../../service/tag.service';
import { FictionService } from '../../service/fiction.service';

@Component({
  selector: 'app-admin-fiction-detail-feature',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatSelectModule,
    MatDividerModule,
    MatIconModule,
    MatButtonModule,
    CdkDropList,
    CdkDrag,
    MatBadgeModule,
  ],
  templateUrl: './admin-fiction-detail-feature.component.html',
  styleUrl: './admin-fiction-detail-feature.component.css',
})
export class AdminFictionDetailFeatureComponent implements OnInit {
  fictionById: Fiction | null = null;
  isUpdate: boolean = false;

  movies = [
    'Episode I - The Phantom Menace',
    'Episode II - Attack of the Clones',
    'Episode III - Revenge of the Sith',
    'Episode IV - A New Hope',
    'Episode V - The Empire Strikes Back',
    'Episode VI - Return of the Jedi',
    'Episode VII - The Force Awakens',
    'Episode VIII - The Last Jedi',
    'Episode IX – The Rise of Skywalker',
  ];

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private fictionService: FictionService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getFictionById();
  }

  getFictionById() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.fictionService.getFictionById(id).subscribe((fiction) => {
      this.fictionById = fiction;
      if (this.fictionById !== null) {
        this.isUpdate = true;
      }
    });
  }

  goBack() {
    this.location.back();
  }

  openDialog(dialogTitle: string) {
    this.dialog.open(TagFictionDialog, {
      minWidth: '400px',
      data: { dialogTitle: dialogTitle },
    });
  }

  // Chapter drag drop
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.movies, event.previousIndex, event.currentIndex);
  }

  // Drag drop image
  dragging = false;
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

  onChange() {}
}

// Dialog Component
@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'dialog-tag-fiction.html',
  styleUrl: './admin-fiction-detail-feature.component.css',
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
    CommonModule,
  ],
})
export class TagFictionDialog implements OnInit {
  dialogTitle = 'Create Tag';
  name = new FormControl<string | Tag>('');

  // Button show
  addButton: boolean = false;
  createButton: boolean = false;

  // Optional tag
  options: Tag[] = [];
  selectedOption: Tag | null = null;

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

  getAllTags() {
    this.tagService.getTags().subscribe((tags) => (this.options = tags));
  }

  createTag(tag: Tag) {
    if (tag.name.trim().length > 0) {
      this.tagService.createTag(tag).subscribe();
    }
  }

  constructor(
    private tagService: TagService,
    @Inject(MAT_DIALOG_DATA) public data: { dialogTitle: string }
  ) {
    if (this.data.dialogTitle) {
      this.dialogTitle = this.data.dialogTitle;
    }
  }

  onOptionSelected(event: MatAutocompleteSelectedEvent) {
    this.selectedOption = event.option.value;
  }

  onAdd() {}

  onSubmit() {}

  // onSubmit() {
  //   if (typeof this.name.value === 'string') {
  //     if (this.data.tag) {
  //       this.data.tag.name = this.name.value;
  //       this.editTag(this.data.tag);
  //     } else {
  //       const newTag: Tag = { id: null, name: this.name.value };
  //       this.createTag(newTag);
  //     }
  //   } else {
  //     console.log('Invalid name', this.name.value);
  //   }
  // }

  ngOnInit() {
    this.getAllTags();
    if (this.data.dialogTitle === 'Add tag') {
      this.addButton = true;
    } else {
      this.createButton = true;
    }
    this.filteredOptions = this.name.valueChanges.pipe(
      startWith(''),
      map((value) => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filter(name as string) : this.options.slice();
      })
    );
  }
}
