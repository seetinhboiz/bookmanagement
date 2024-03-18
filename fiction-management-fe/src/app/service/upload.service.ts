import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  constructor(private http: HttpClient) {}

  urlUpload = 'http://localhost:8080/api/file';

  uploadFile(file: File): Observable<string> {
    const formData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post<string>(`${this.urlUpload}/upload`, formData);
  }
}
