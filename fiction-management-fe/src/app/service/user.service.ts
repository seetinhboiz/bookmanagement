import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interface/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  urlUser = 'http://localhost:8080/api/users';

  username: string | null = '';
  password: string | null = '';

  headers = new HttpHeaders({});

  constructor(private http: HttpClient) {
    this.getCredential();
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.urlUser, { headers: this.headers });
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.urlUser}/${id}`, {
      headers: this.headers,
    });
  }

  getUserByUsername(username: string) {
    console.log('this called');
    return this.http.get<User>(`${this.urlUser}/username/${username}`, {
      headers: this.headers,
    });
  }

  getAllUsername() {
    return this.http.get<string[]>(`${this.urlUser}/allUsername`, {
      headers: this.headers,
    });
  }

  createUser(user: User): Observable<User> {
    console.log('this function has called');
    return this.http.post<User>(`${this.urlUser}/create`, user, {
      headers: this.headers,
    });
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.urlUser}/update/${user.id}`, user, {
      headers: this.headers,
    });
  }

  deleteUser(id: number): Observable<unknown> {
    return this.http.delete(`${this.urlUser}/delete/${id}`, {
      headers: this.headers,
    });
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
