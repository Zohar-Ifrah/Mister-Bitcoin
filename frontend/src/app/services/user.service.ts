import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://mister-bitcoin-7pqz.onrender.com/api/user'

  user: User = {
    _id: 'u123',
    name: 'DefUser',
    coins: 110,
    moves: []
  }
  constructor(private http: HttpClient) { }

  private _loggedInUser$ = new BehaviorSubject(this.user)
  public loggedInUser$ = this._loggedInUser$.asObservable()

  getUser(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  getLoggedInUser() {
    return this._loggedInUser$.value
  }

}



