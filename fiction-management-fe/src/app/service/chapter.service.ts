import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Chapter } from '../interface/chapter';

@Injectable({
  providedIn: 'root'
})
export class ChapterService {

  constructor(private http: HttpClient) {}

  urlChapter = 'http://localhost:8080/api/chapters';

  getChapters(): Observable<Chapter[]> {
    return this.http.get<Chapter[]>(this.urlChapter);
  }

  getChapterById(id: number): Observable<Chapter> {
    return this.http.get<Chapter>(`${this.urlChapter}/${id}`);
  }

  createChapter(chapter: Chapter): Observable<Chapter> {
    console.log('this function has called');
    return this.http.post<Chapter>(`${this.urlChapter}/create`, chapter);
  }

  updateChapter(chapter: Chapter): Observable<Chapter> {
    return this.http.put<Chapter>(`${this.urlChapter}/update/${chapter.id}`, chapter);
  }

  deleteChapter(id: number): Observable<unknown> {
    return this.http.delete(`${this.urlChapter}/delete/${id}`);
  }
}
