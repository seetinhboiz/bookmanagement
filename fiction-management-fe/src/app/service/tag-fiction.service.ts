import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TagFiction } from '../interface/tag-fiction';

@Injectable({
  providedIn: 'root'
})
export class TagFictionService {

  urlTagFiction = 'http://localhost:8080/api/tagFicitons';

  constructor(private http: HttpClient) {}

  createTagFiction(tagFiciton: TagFiction): Observable<TagFiction> {
    return this.http.post<TagFiction>(`${this.urlTagFiction}/create`, tagFiciton);
  }

  deleteTagFiction(fictionId: number, tagId: number): Observable<unknown> {
    return this.http.delete(`${this.urlTagFiction}/delete/${fictionId}/${tagId}`);
  }
}
