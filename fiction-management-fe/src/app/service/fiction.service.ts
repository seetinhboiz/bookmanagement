import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Fiction } from '../interface/fiction';

@Injectable({
  providedIn: 'root',
})
export class FictionService {
  constructor(private http: HttpClient) {}

  urlFiction = 'http://localhost:8080/api/fictions';

  getFictions(): Observable<Fiction[]> {
    return this.http.get<Fiction[]>(this.urlFiction);
  }

  getFictionById(id: number): Observable<Fiction> {
    return this.http.get<Fiction>(`${this.urlFiction}/${id}`);
  }

  getFictionByUserId(userId: number): Observable<Fiction[]> {
    return this.http.get<Fiction[]>(`${this.urlFiction}/user/${userId}`);
  }

  createFiction(fiction: Fiction): Observable<Fiction> {
    return this.http.post<Fiction>(`${this.urlFiction}/create`, fiction);
  }

  updateFiction(fiction: Fiction): Observable<Fiction> {
    return this.http.put<Fiction>(
      `${this.urlFiction}/update/${fiction.id}`,
      fiction
    );
  }

  deleteFiction(id: number): Observable<unknown> {
    return this.http.delete(`${this.urlFiction}/delete/${id}`);
  }
}
