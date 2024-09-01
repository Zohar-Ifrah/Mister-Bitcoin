import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { User } from "../models/user.model";
import { BehaviorSubject, from, map, of, switchMap, tap, throwError } from "rxjs";
import { storageService } from "./storage.service";
import { Contact } from "../models/contact.model";
import { Move } from "../models/move.model";

const ENTITY = 'user'
const ENTITY_LOGGEDIN_USER = 'loggedinUser'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _apiUrl = 'https://mister-bitcoin-7pqz.onrender.com/api/user'
  // private _apiUrl = 'http://localhost:3000/api/user'

  constructor(private http: HttpClient) {
    const users = JSON.parse(localStorage.getItem(ENTITY)!)
    if (!users || users.length === 0) {
      localStorage.setItem(ENTITY, JSON.stringify([]))
    }
  }
  private _loggedInUser$ = new BehaviorSubject<User | null>(storageService.loadFromSession(ENTITY_LOGGEDIN_USER))
  public loggedInUser$ = this._loggedInUser$.asObservable()

  public signup(name: string) {
    return this.http.get<User[]>(`${this._apiUrl}`).pipe(
      map(users => users.find(_user => _user.name === name)),
      switchMap(user => user
        ? of(user)
        : this.http.post<User>(`${this._apiUrl}`, this._createUser(name) as User)
      ),
      tap(user => this._saveLocalUser(user))
    );
  }

  public logout() {
    return of(null).pipe(
      tap(() => {
        this._saveLocalUser(null)
        sessionStorage.clear()
      })
    );
  }

  public addMove(contact: Contact, amount: number) {
    if (!amount) return of(null)
    const loggedInUser = { ...this.getLoggedInUser() }
    if (loggedInUser.coins < amount) return throwError(() => 'Not enough coins!')
    const newMove = this._createMove(contact, amount)
    loggedInUser.coins -= amount
    loggedInUser.moves.unshift(newMove)
    return this.http.put<User>(`${this._apiUrl}/${loggedInUser._id}`, loggedInUser).pipe(
      tap(() => this._saveLocalUser(loggedInUser))
    )
  }

  getLoggedInUser(): User {
    // return this._loggedInUser$.value;
    return this._loggedInUser$.value || { _id: '', name: 'Guest', coins: 0, moves: [] };
  }
  //   getLoggedInUser(): User {
  //     const user = this._loggedInUser$.value;
  //     if (!user) throw new Error('No logged in user found');
  //     return user;
  // }
  _createUser(name: string): Partial<User> {
    return {
      name,
      coins: 100,
      moves: []
    }
  }

  _createMove(contact: Contact, amount: number): Move {
    return {
      toId: contact._id,
      to: contact.name,
      at: Date.now(),
      amount
    }
  }

  _saveLocalUser(user: User | null) {
    this._loggedInUser$.next(user && { ...user });
    storageService.saveToSession(ENTITY_LOGGEDIN_USER, user);
  }
}
