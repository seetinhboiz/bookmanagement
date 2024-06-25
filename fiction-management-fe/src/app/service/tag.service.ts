import { Injectable } from '@angular/core';
import { Tag } from '../interface/tag';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TagService {
  urlTag = 'http://localhost:8080/api/tags';

  username: string | null = '';
  password: string | null = '';

  headers = new HttpHeaders({});

  constructor(private http: HttpClient) {
    this.getCredential();
  }

  getTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>(this.urlTag, { headers: this.headers });
  }

  getTagById(id: number): Observable<Tag> {
    return this.http.get<Tag>(`${this.urlTag}/${id}`, {
      headers: this.headers,
    });
  }

  createTag(tag: Tag): Observable<Tag> {
    return this.http.post<Tag>(`${this.urlTag}/create`, tag, {
      headers: this.headers,
    });
  }

  updateTag(tag: Tag): Observable<Tag> {
    return this.http.put<Tag>(`${this.urlTag}/update/${tag.id}`, tag, {
      headers: this.headers,
    });
  }

  deleteTag(id: number): Observable<unknown> {
    return this.http.delete(`${this.urlTag}/delete/${id}`, {
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
