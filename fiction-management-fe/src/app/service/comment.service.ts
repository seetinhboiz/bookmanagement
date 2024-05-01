import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Comment } from '../interface/comment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) {}

  urlComment = 'http://localhost:8080/api/comments';

  postComment(comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(`${this.urlComment}/create`, comment);
  }

  updateComment(comment: Comment): Observable<Comment> {
    return this.http.put<Comment>(`${this.urlComment}/update/${comment.id}`, comment);
  }

  deleteComment(id: number): Observable<unknown> {
    return this.http.delete(`${this.urlComment}/delete/${id}`);
  }
}
