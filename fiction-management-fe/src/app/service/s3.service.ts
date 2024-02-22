import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class S3Service {
  constructor(private http: HttpClient) {}

  urlS3 = 'http://localhost:8080/api/s3';

  uploadFile(file: File): Observable<string> {
    const formData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post<string>(`${this.urlS3}/upload`, formData, {responseType: 'text' as 'json'});
  }

  getFileUrl(fileName: string): Observable<string> {
    return this.http.get<string>(`${this.urlS3}/getUrl/${fileName}`, {responseType: 'text' as 'json'});
  }

  deleteFile(fileName: string): Observable<string> {
    return this.http.delete<string>(`${this.urlS3}/delete/${fileName}`);
  }
}
