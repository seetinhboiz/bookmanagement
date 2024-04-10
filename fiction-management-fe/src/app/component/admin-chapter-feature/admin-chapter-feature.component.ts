import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute } from '@angular/router';
import { EditorModule } from '@tinymce/tinymce-angular';
import { Chapter } from '../../interface/chapter';
import { ChapterService } from '../../service/chapter.service';

@Component({
  selector: 'app-admin-chapter-feature',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    EditorModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './admin-chapter-feature.component.html',
  styleUrl: './admin-chapter-feature.component.css',
})
export class AdminChapterFeatureComponent {
  editorConfig = {
    base_url: '/tinymce',
    suffix: '.min',
    plugins: 'lists link image table wordcount',
    placeholder: 'Chapter content',
  };

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private chapterService: ChapterService
  ) {
    this.getFictionId();
    this.getChapterId();
    this.getChapterById();
  }

  // FormControl
  name = new FormControl();
  content = new FormControl();

  fictionId = -1;
  chapterId = -1;

  chapterById: Chapter | undefined;

  getFictionId() {
    this.fictionId = Number(this.route.snapshot.paramMap.get('fictionId'));
  }

  getChapterId() {
    this.chapterId =
      Number(this.route.snapshot.paramMap.get('chapterId')) || -1;
  }

  getChapterById() {
    if (this.chapterId !== -1) {
      this.chapterService
        .getChapterById(this.chapterId)
        .subscribe((chapter) => {
          this.chapterById = chapter;
          this.updateFormControl();
        });
    }
  }

  updateFormControl() {
    this.name.setValue(this.chapterById?.name);
    this.content.setValue(this.chapterById?.content);
  }

  goBack() {
    this.location.back();
  }

  onCreateChapter() {
    const newChapter: Chapter = {
      name: this.name.value || '',
      content: this.content.value || '',
      fictionId: this.fictionId,
    };
    this.chapterService.createChapter(newChapter).subscribe();
  }

  onUpdateChapter() {
    if (typeof this.chapterById !== 'undefined') {
      const updateChapter: Chapter = {
        id: this.chapterById.id,
        name: this.name.value || '',
        content: this.content.value || '',
        fictionId: this.chapterById.fictionId,
        sort: this.chapterById.sort,
      };
      this.chapterService.updateChapter(updateChapter).subscribe();
    }
  }

  onSubmit() {
    if (this.chapterId === -1) {
      console.log('create')
      this.onCreateChapter();
    } else {
      console.log('update')
      this.onUpdateChapter();
    }
  }
}
