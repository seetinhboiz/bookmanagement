import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Chapter } from '../../interface/chapter';
import { Comment } from '../../interface/comment';
import { Fiction } from '../../interface/fiction';
import { Tag } from '../../interface/tag';
import { CommentService } from '../../service/comment.service';
import { FictionService } from '../../service/fiction.service';

@Component({
  selector: 'app-fiction-detail',
  standalone: true,
  imports: [
    MatTableModule,
    MatChipsModule,
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterLink,
  ],
  templateUrl: './fiction-detail.component.html',
  styleUrl: './fiction-detail.component.css',
})
export class FictionDetailComponent {
  constructor(
    private fictionService: FictionService,
    private commentService: CommentService,
    private route: ActivatedRoute,
    private routerNavigate: Router
  ) {
    this.getFictionById();
  }

  fictionById: Fiction | null = null;
  chapters: Chapter[] = [];
  tags: Tag[] = [];
  comments: Comment[] = [];

  displayedColumns: string[] = ['position', 'name'];
  dataSource = this.chapters;

  commentInput = new FormControl('');

  commentEditInput = new FormControl('');

  username =
    typeof localStorage !== 'undefined' ? localStorage.getItem('username') : '';

  editCommentId: number | null = null;

  getFictionById() {
    const idParam = Number(this.route.snapshot.paramMap.get('id'));
    if (idParam) {
      this.fictionService.getFictionById(idParam).subscribe((fiction) => {
        this.fictionById = fiction;
        if (fiction.chapters) {
          this.chapters = fiction.chapters;
          this.dataSource = this.chapters;
        }
        if (fiction.tags) {
          this.tags = fiction.tags;
        }
        if (fiction.comments) {
          this.comments = fiction.comments;
        }
      });
    }
  }

  onPostComment() {
    const newComment: Comment = {
      content: this.commentInput.value || '',
      fictionId: this.fictionById?.id || -1,
      userId: Number(localStorage.getItem('userId')),
    };

    this.commentService.postComment(newComment).subscribe(() => {
      this.getFictionById();
    });
  }

  onEditComment(comment: Comment) {
    this.commentEditInput.setValue(comment.content);
    if (comment.id) {
      this.editCommentId = comment.id;
    }
  }

  onCancelEdit() {
    this.editCommentId = null;
  }

  onSaveEditComment(comment: Comment) {
    if (this.commentEditInput.value) {
      comment.content = this.commentEditInput.value;
    }
    this.commentService.updateComment(comment).subscribe(() => {
      this.getFictionById();
      this.onCancelEdit();
    });
  }

  onDeleteComment(id: number) {
    this.commentService.deleteComment(id).subscribe(() => {
      this.getFictionById();
    });
  }

  routerToChapter(chapterId: number) {
    console.log('this worked', chapterId);
    this.routerNavigate.navigate(['/fiction', this.fictionById?.id, 'chapter', chapterId]);
  }
}
