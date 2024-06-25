import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Chapter } from '../interface/chapter';

@Injectable({
  providedIn: 'root',
})
export class ChapterService {
  constructor(private http: HttpClient) {
    this.getCredential();
  }

  username: string | null = '';
  password: string | null = '';

  headers = new HttpHeaders({});

  urlChapter = 'http://localhost:8080/api/chapters';

  getChapters(): Observable<Chapter[]> {
    return this.http.get<Chapter[]>(this.urlChapter, { headers: this.headers });
  }

  getChapterById(id: number): Observable<Chapter> {
    return this.http.get<Chapter>(`${this.urlChapter}/${id}`, {
      headers: this.headers,
    });
  }

  createChapter(chapter: Chapter): Observable<Chapter> {
    return this.http.post<Chapter>(`${this.urlChapter}/create`, chapter, {
      headers: this.headers,
    });
  }

  updateChapter(chapter: Chapter): Observable<Chapter> {
    return this.http.put<Chapter>(
      `${this.urlChapter}/update/${chapter.id}`,
      chapter,
      { headers: this.headers }
    );
  }

  deleteChapter(id: number): Observable<unknown> {
    return this.http.delete(`${this.urlChapter}/delete/${id}`, {
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
