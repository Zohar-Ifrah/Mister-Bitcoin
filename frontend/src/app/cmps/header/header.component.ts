import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  private userService = inject(UserService)
  private router = inject(Router)
  loggedInUser$!: Observable<User>
  // loggedInUser$!: Observable<User | null>

  ngOnInit(): void {
    this.loggedInUser$ = this.userService.loggedInUser$
  }

  onLogout(): void {
    this.userService.logout()
    this.router.navigateByUrl("/signup")
  }

}
