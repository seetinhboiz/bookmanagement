import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Comment } from '../interface/comment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(private http: HttpClient) {
    this.getCredential();
  }

  urlComment = 'http://localhost:8080/api/comments';

  username: string | null = '';
  password: string | null = '';

  headers = new HttpHeaders({});

  postComment(comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(`${this.urlComment}/create`, comment, {
      headers: this.headers,
    });
  }

  updateComment(comment: Comment): Observable<Comment> {
    return this.http.put<Comment>(
      `${this.urlComment}/update/${comment.id}`,
      comment,
      { headers: this.headers }
    );
  }

  deleteComment(id: number): Observable<unknown> {
    return this.http.delete(`${this.urlComment}/delete/${id}`, {
      headers: this.headers,
    });
  }

  getCredential() {
    if (typeof sessionStorage !== 'undefined') {
      this.username = sessionStorage.getItem('username');
      this.password = sessionStorage.getItem('password');

      // this.headers.append(
      //   'Authorization',
      //   'Basic ' + btoa(`${this.username}:${this.password}`)
      // );
      this.updateHeaders();
    }
  }

  updateHeaders() {
    if (this.username && this.password) {
      const auth = 'Basic ' + btoa(`${this.username}:${this.password}`);
      this.headers = new HttpHeaders({ Authorization: auth });
    }
  }
}
