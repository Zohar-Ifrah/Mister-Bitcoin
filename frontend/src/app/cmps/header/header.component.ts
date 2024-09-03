import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { filter, Observable, tap } from 'rxjs';
import { User } from '../../models/user.model';
import { NavigationEnd, Router } from '@angular/router';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  private userService = inject(UserService)
  private router = inject(Router)
  loggedInUser$!: Observable<User>
  isMenuOpen: boolean = false
  // loggedInUser$!: Observable<User | null>

  constructor() {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        tap(() => this.toggleMenu(false))
      )
      .subscribe();
  }

  ngOnInit(): void {
    this.loggedInUser$ = this.userService.loggedInUser$
  }

  onLogout(): void {
    this.userService.logout()
    this.router.navigateByUrl("/signup")
  }


  toggleMenu(toggle: boolean = true) {
    toggle ?
    this.isMenuOpen = !this.isMenuOpen :
    this.isMenuOpen = toggle
  }
}
