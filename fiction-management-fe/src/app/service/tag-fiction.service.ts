import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TagFiction } from '../interface/tag-fiction';

@Injectable({
  providedIn: 'root',
})
export class TagFictionService {
  urlTagFiction = 'http://localhost:8080/api/tagFicitons';

  username: string | null = '';
  password: string | null = '';

  headers = new HttpHeaders({});

  constructor(private http: HttpClient) {
    this.getCredential();
  }

  createTagFiction(tagFiciton: TagFiction): Observable<TagFiction> {
    return this.http.post<TagFiction>(
      `${this.urlTagFiction}/create`,
      tagFiciton,
      { headers: this.headers }
    );
  }

  deleteTagFiction(fictionId: number, tagId: number): Observable<unknown> {
    return this.http.delete(
      `${this.urlTagFiction}/delete/${fictionId}/${tagId}`,
      { headers: this.headers }
    );
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
