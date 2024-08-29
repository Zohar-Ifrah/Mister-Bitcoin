import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  getUser(): User {
    return {
      _id: "01",
      name: "Moshe",
      coins: 100,
      moves: []
    }
  }
}
