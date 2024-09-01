import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { map, tap } from 'rxjs';

export const noAuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  return inject(UserService).loggedInUser$.pipe(
    map(user => !user || router.createUrlTree(['/home']))
  )
}
