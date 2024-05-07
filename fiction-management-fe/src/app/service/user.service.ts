import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interface/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  urlUser = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.urlUser);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.urlUser}/${id}`);
  }

  getUserByUsername(username: string) {
    return this.http.get<User>(`${this.urlUser}/username/${username}`)
  }

  getAllUsername() {
    return this.http.get<string[]>(`${this.urlUser}/allUsername`)
  }

  createUser(user: User): Observable<User> {
    console.log('this function has called');
    return this.http.post<User>(`${this.urlUser}/create`, user);
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.urlUser}/update/${user.id}`, user);
  }

  deleteUser(id: number): Observable<unknown> {
    return this.http.delete(`${this.urlUser}/delete/${id}`);
  }
}
