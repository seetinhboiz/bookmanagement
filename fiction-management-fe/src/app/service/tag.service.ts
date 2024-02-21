import { Injectable } from '@angular/core';
import { Tag } from '../interface/tag';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TagService {
  urlTag = 'http://localhost:8080/api/tags';

  constructor(private http: HttpClient) {}

  getTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>(this.urlTag);
  }

  getTagById(id: number): Observable<Tag> {
    return this.http.get<Tag>(`${this.urlTag}/${id}`);
  }

  createTag(tag: Tag): Observable<Tag> {
    return this.http.post<Tag>(`${this.urlTag}/create`, tag);
  }

  updateTag(tag: Tag): Observable<Tag> {
    return this.http.put<Tag>(`${this.urlTag}/update/${tag.id}`, tag);
  }

  deleteTag(id: number): Observable<unknown> {
    return this.http.delete(`${this.urlTag}/delete/${id}`);
  }
}
