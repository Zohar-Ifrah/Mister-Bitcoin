import { Component, inject } from '@angular/core';
import { take } from 'rxjs';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { MsgService } from '../../services/msg.service';

@Component({
  selector: 'signup-page',
  templateUrl: './signup-page.component.html',
  styleUrl: './signup-page.component.scss'
})
export class SignupPageComponent {
  private msgService = inject(MsgService)
  userName = ''

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  signUp(): void {
    if (this.userName === ''){
      this.msgService.setErrorMsg('Please enter a valid username.')
      return
    }
    
    this.userService.signup(this.userName)
    .pipe(take(1))
    .subscribe({
        next: () => {
            this.router.navigate(['/home'])
        },
        error: (err) => {
            this.msgService.setErrorMsg('Signup failed. Please try again later.')
            console.error('Signup error:', err)
        }
    })
  }
}
