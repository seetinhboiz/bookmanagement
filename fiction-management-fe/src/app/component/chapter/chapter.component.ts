import { Component } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Chapter } from '../../interface/chapter';
import { ChapterService } from '../../service/chapter.service';

@Component({
  selector: 'app-chapter',
  standalone: true,
  imports: [MatDividerModule],
  templateUrl: './chapter.component.html',
  styleUrl: './chapter.component.css',
})
export class ChapterComponent {
  constructor(
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private chapterService: ChapterService
  ) {
    this.getChapterById();
  }

  chapterById: Chapter | null = null;

  safeHtmlContent: SafeHtml | null = null;

  getChapterById() {
    const idParam = Number(this.route.snapshot.paramMap.get('chapterId'));
    this.chapterService.getChapterById(idParam).subscribe((chapter) => {
      this.chapterById = chapter;
      this.safeHtmlContent = this.sanitizer.bypassSecurityTrustHtml(
        chapter.content
      );
    });
  }
}
