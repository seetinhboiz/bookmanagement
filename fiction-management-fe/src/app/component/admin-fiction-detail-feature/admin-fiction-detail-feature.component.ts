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
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute } from '@angular/router';
import { Observable, map, startWith } from 'rxjs';
import { Chapter } from '../../interface/chapter';
import { Comment } from '../../interface/comment';
import { Fiction } from '../../interface/fiction';
import { Tag } from '../../interface/tag';
import { FictionService } from '../../service/fiction.service';
import { S3Service } from '../../service/s3.service';
import { TagService } from '../../service/tag.service';

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
    ReactiveFormsModule,
    MatTabsModule,
  ],
  templateUrl: './admin-fiction-detail-feature.component.html',
  styleUrl: './admin-fiction-detail-feature.component.css',
})
export class AdminFictionDetailFeatureComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private fictionService: FictionService,
    private s3Service: S3Service,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getFictionById();
  }

  fictionById: Fiction | null = null;
  isUpdate: boolean = false;

  isUpdateFile: boolean = false;
  selectedFile: File | undefined;

  avatarUrl = '';
  dragging = false;

  // Comment
  comments: Comment[] = [];
  tags: Tag[] = [];

  name = new FormControl();
  status = new FormControl();
  description = new FormControl();
  userId = new FormControl();
  countView = new FormControl();
  coverUrl = new FormControl();

  getFictionById() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.fictionService.getFictionById(id).subscribe((fiction) => {
      this.fictionById = fiction;
      if (this.fictionById !== null) {
        this.isUpdate = true;
        this.updateFormControls();
        this.getFictionCover();
        this.comments = this.fictionById.comments || [];
        this.tags = this.fictionById.tags || [];
        this.loadCommentsWithAvatarUrls();
      }
    });
  }

  loadCommentsWithAvatarUrls() {
    this.comments.forEach((comment, index) => {
      this.s3Service.getFileUrl(comment.user.avatarUrl).subscribe((url) => {
        this.comments[index].user.avatarUrl = url;
      });
    });
  }

  getFictionCover() {
    if (this.fictionById) {
      this.s3Service
        .getFileUrl(this.fictionById?.coverUrl)
        .subscribe((url) => (this.avatarUrl = url));
    }
  }

  updateFormControls() {
    this.name.setValue(this.fictionById?.name);
    this.status.setValue(this.fictionById?.status);
    this.description.setValue(this.fictionById?.description);
    this.countView.setValue(this.fictionById?.countView);
    this.userId.setValue(this.fictionById?.user?.username);
  }

  createFiction() {
    const newFiction: Fiction = {
      name: this.name.value,
      status: this.status.value,
      description: this.description.value,
      countView: 0,
      userId: 1,
      coverUrl: this.avatarUrl,
    };
    this.fictionService
      .createFiction(newFiction)
      .subscribe(() => this.location.back());
  }

  onFileSelected(event: any) {
    const files = (event.target as HTMLInputElement).files;
    this.handleFiles(files);
    this.isUpdateFile = true;
    this.selectedFile = event.target.files[0];
  }

  uploadFileAndSave() {
    if (this.selectedFile) {
      this.s3Service.uploadFile(this.selectedFile).subscribe((fName) => {
        this.avatarUrl = fName;
        if (this.fictionById) {
          // this.updateUser();
        } else {
          this.createFiction();
        }
      });
    } else {
      console.log('No file selected');
    }
  }

  goBack() {
    this.location.back();
  }

  onSubmitChapter() {}

  openDialog(dialogTitle: string) {
    this.dialog.open(TagFictionDialog, {
      minWidth: '400px',
      data: { dialogTitle: dialogTitle },
    });
  }

  // Chapter drag drop
  drop(event: CdkDragDrop<string[]>) {
    if (this.fictionById?.chapters !== undefined) {
      moveItemInArray(
        this.fictionById?.chapters,
        event.previousIndex,
        event.currentIndex
      );
      this.fictionById?.chapters.forEach((chapter: Chapter, index: any) => {
        chapter.sort = index + 1;
      });
    }
  }

  // Drag drop image
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

  onSelectChange() {}

  onSubmitFiction() {
    if (this.fictionById) {
      console.log('update');
    } else {
      this.uploadFileAndSave();
    }
  }
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
