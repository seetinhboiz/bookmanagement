import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Fiction } from '../interface/fiction';
import { Process } from '../interface/process';

@Injectable({
  providedIn: 'root',
})
export class FictionService {
  constructor(private http: HttpClient) {}

  urlFiction = 'http://localhost:8080/api/fictions';

  getFictions(): Observable<Fiction[]> {
    return this.http.get<Fiction[]>(this.urlFiction);
  }

  getFilterFiction(
    tagId: number | null,
    keyword: string | null
  ): Observable<Fiction[]> {
    let queryParam = [];

    if (tagId !== -1) {
      queryParam.push(`tagId=${tagId}`);
    }

    if (keyword !== '') {
      queryParam.push(`keyword=${keyword}`);
    }

    const queryString = queryParam.length > 0 ? `?${queryParam.join('&')}` : '';

    return this.http.get<Fiction[]>(`${this.urlFiction}/filter${queryString}`);
  }

  getFictionById(id: number): Observable<Fiction> {
    let userId;
    if (typeof sessionStorage !== 'undefined') {
      userId = sessionStorage.getItem('id');
    }
    return this.http.get<Fiction>(`${this.urlFiction}/${id}/${userId}`);
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

  updateProcess(process: Process): Observable<Process> {
    return this.http.put<Process>(
      'http://localhost:8080/api/process/update',
      process
    );
  }
}
