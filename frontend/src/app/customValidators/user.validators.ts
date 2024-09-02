import { inject } from "@angular/core";
import { AbstractControl } from "@angular/forms";
import { debounceTime, map, switchMap, timer } from "rxjs";
import { UserService } from "../services/user.service";

export function nameTaken(userService: UserService) {
  return (control: AbstractControl) => {
    return timer(1000).pipe(
    //   debounceTime(500),
      switchMap(() => userService.getUsers()), // מביא את רשימת המשתמשים
      map(users => {
        const userExists = users.some(user => user.name === control.value);
        return userExists ? { nameTaken: true } : null;
      })
    );
  };
}
