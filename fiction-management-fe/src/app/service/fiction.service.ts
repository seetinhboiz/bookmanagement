import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Fiction } from '../interface/fiction';
import { Process } from '../interface/process';

@Injectable({
  providedIn: 'root',
})
export class FictionService {
  urlFiction = 'http://localhost:8080/api/fictions';

  username: string | null = '';
  password: string | null = '';

  headers = new HttpHeaders({});

  constructor(private http: HttpClient) {
    this.getCredential();
  }

  getFictions(): Observable<Fiction[]> {
    return this.http.get<Fiction[]>(this.urlFiction, { headers: this.headers });
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

    return this.http.get<Fiction[]>(`${this.urlFiction}/filter${queryString}`, {
      headers: this.headers,
    });
  }

  getFictionById(id: number): Observable<Fiction> {
    let userId;
    if (typeof sessionStorage !== 'undefined') {
      userId = sessionStorage.getItem('id');
    }
    return this.http.get<Fiction>(`${this.urlFiction}/${id}/${userId}`, {
      headers: this.headers,
    });
  }

  getFictionByUserId(userId: number): Observable<Fiction[]> {
    return this.http.get<Fiction[]>(`${this.urlFiction}/user/${userId}`, {
      headers: this.headers,
    });
  }

  createFiction(fiction: Fiction): Observable<Fiction> {
    return this.http.post<Fiction>(`${this.urlFiction}/create`, fiction, {
      headers: this.headers,
    });
  }

  updateFiction(fiction: Fiction): Observable<Fiction> {
    return this.http.put<Fiction>(
      `${this.urlFiction}/update/${fiction.id}`,
      fiction,
      { headers: this.headers }
    );
  }

  deleteFiction(id: number): Observable<unknown> {
    return this.http.delete(`${this.urlFiction}/delete/${id}`, {
      headers: this.headers,
    });
  }

  updateProcess(process: Process): Observable<Process> {
    return this.http.put<Process>(
      'http://localhost:8080/api/process/update',
      process,
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
