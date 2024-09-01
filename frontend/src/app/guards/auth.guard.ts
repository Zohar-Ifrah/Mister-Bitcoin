import { inject } from '@angular/core'
import { CanActivateFn, Router } from '@angular/router'
import { UserService } from '../services/user.service'
import { map } from 'rxjs'
import { MsgService } from '../services/msg.service'

export const authGuard: CanActivateFn = (route, state) => {
  const msgService = inject(MsgService)
  const userService = inject(UserService)
  const router = inject(Router)
  
  return userService.loggedInUser$.pipe(
    map(user => {
        if (!user) {
            msgService.setErrorMsg('Not authorize!')
            return router.createUrlTree(['/signup'])
        }
        return true
    })
)
}