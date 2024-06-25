import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  constructor(private http: HttpClient) {
    this.getCredential();
  }

  urlUpload = 'http://localhost:8080/api/file';

  username: string | null = '';
  password: string | null = '';

  headers = new HttpHeaders({});

  uploadFile(file: File): Observable<string> {
    const formData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post<string>(`${this.urlUpload}/upload`, formData, {headers: this.headers});
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
