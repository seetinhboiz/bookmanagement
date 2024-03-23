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
import { MatChipsModule } from '@angular/material/chips';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable, map, startWith } from 'rxjs';
import { Chapter } from '../../interface/chapter';
import { Comment } from '../../interface/comment';
import { Fiction } from '../../interface/fiction';
import { Tag } from '../../interface/tag';
import { TagFiction } from '../../interface/tag-fiction';
import { ChapterService } from '../../service/chapter.service';
import { FictionService } from '../../service/fiction.service';
import { TagFictionService } from '../../service/tag-fiction.service';
import { TagService } from '../../service/tag.service';
import { UploadService } from '../../service/upload.service';

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
    MatChipsModule,
    RouterLink,
  ],
  templateUrl: './admin-fiction-detail-feature.component.html',
  styleUrl: './admin-fiction-detail-feature.component.css',
})
export class AdminFictionDetailFeatureComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private fictionService: FictionService,
    private chapterService: ChapterService,
    private tagService: TagService,
    private tagFictionService: TagFictionService,
    private fileUploadService: UploadService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getFictionById();
  }

  fictionById: Fiction | null = null;
  isUpdate: boolean = false;

  isUpdateFile: boolean = false;
  selectedFile: File | undefined;

  fileName = '';
  avatarPublicId = '';

  avatarUrl = '';
  dragging = false;

  // Comment
  comments: Comment[] = [];

  // Tag
  tags: Tag[] = [];
  availableTags: Tag[] = [];

  // Form Control
  name = new FormControl();
  status = new FormControl();
  description = new FormControl();
  userId = new FormControl();
  countView = new FormControl();
  coverUrl = new FormControl();

  getFictionById() {
    const idParam = Number(this.route.snapshot.paramMap.get('id'));
    if (idParam) {
      this.fictionService.getFictionById(idParam).subscribe((fiction) => {
        this.fictionById = fiction;
        if (this.fictionById !== null) {
          this.isUpdate = true;
          this.updateFormControls();
          this.comments = this.fictionById.comments || [];
          this.avatarUrl = this.fictionById.coverUrl || '';
          this.tags = this.fictionById.tags || [];
          this.getAvailableTags();
        }
      });
    }
  }

  getAvailableTags() {
    this.tagService.getTags().subscribe((tags) => {
      this.availableTags = tags;
      this.updateTagSelection();
    });
  }

  updateTagSelection() {
    this.availableTags.forEach((tag) => {
      tag.selected = this.tags.some((t) => t.id === tag.id);
    });
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
      userId: 134,
      coverUrl: this.fileName,
      coverPublicId: this.avatarPublicId,
    };
    this.fictionService
      .createFiction(newFiction)
      .subscribe(() => this.location.back());
  }

  updateFiction() {
    const updateFiction: Fiction = {
      id: this.fictionById?.id,
      name: this.name.value,
      status: this.status.value,
      description: this.description.value,
      countView: this.fictionById?.countView ? this.fictionById?.countView : 0,
      userId: 134,
      coverUrl:
        this.isUpdateFile && this.fileName
          ? this.fileName
          : this.fictionById?.coverUrl || '',
      coverPublicId: this.fictionById?.coverPublicId
        ? this.fictionById?.coverPublicId
        : '',
    };
    this.fictionService
      .updateFiction(updateFiction)
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
      this.fileUploadService
        .uploadFile(this.selectedFile)
        .subscribe((responseUpload: any) => {
          this.fileName = responseUpload.url;
          this.avatarPublicId = responseUpload.public_id;
          if (this.fictionById) {
            this.updateFiction();
          } else {
            this.createFiction();
          }
        });
    } else {
      console.log('No file selected');
    }
  }

  // TagFiction
  createTagFiction(tag: Tag) {
    if (this.fictionById?.id && tag.id) {
      const tagFiction: TagFiction = {
        fictionId: this.fictionById?.id,
        tagId: tag.id,
      };
      this.tagFictionService
        .createTagFiction(tagFiction)
        .subscribe(() => this.getFictionById());
    }
  }

  deleteTagFiction(tag: Tag) {
    if (this.fictionById?.id && tag.id) {
      this.tagFictionService
        .deleteTagFiction(this.fictionById?.id, tag.id)
        .subscribe(() => this.getFictionById());
    }
  }

  onTagSelectionChange(tag: Tag) {
    tag.selected = !tag.selected;
    console.log(tag.selected);
    if (tag.selected) {
      this.createTagFiction(tag);
    } else {
      this.deleteTagFiction(tag);
    }
  }

  goBack() {
    this.location.back();
  }

  openDialog(dialogTitle: string) {
    this.dialog.open(TagFictionDialog, {
      minWidth: '400px',
      data: { dialogTitle: dialogTitle },
    });

    this.dialog.afterAllClosed.subscribe(() => {
      this.getAvailableTags();
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

  onDragChapter(sort: number, index: number) {
    console.log('sort: ', sort);
    console.log('index: ', index);
  }

  onUpdateSortChapter() {
    this.fictionById?.chapters?.forEach((chapter) => {
      this.chapterService.updateChapter(chapter).subscribe();
    });
  }

  onDeleteChapter(id: number) {
    this.chapterService.deleteChapter(id).subscribe(() => {
      this.getFictionById();
    });
  }

  onSubmitChapter() {}

  onSubmitFiction() {
    if (this.fictionById && this.isUpdateFile === false) {
      this.updateFiction();
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

  createTag() {
    if (typeof this.name.value === 'string') {
      const newTag: Tag = { name: this.name.value };
      if (newTag.name.trim().length > 0) {
        this.tagService.createTag(newTag).subscribe();
        this.dialogRef.close();
      }
    }
  }

  constructor(
    private dialogRef: MatDialogRef<TagFictionDialog>,
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

  onSubmit() {
    this.createTag();
  }

  ngOnInit() {
    this.getAllTags();
    this.filteredOptions = this.name.valueChanges.pipe(
      startWith(''),
      map((value) => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filter(name as string) : this.options.slice();
      })
    );
  }
}
