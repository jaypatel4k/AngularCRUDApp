import { CanActivateFn, Router } from '@angular/router';
import { AuthserviceService } from '../services/authservice.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  return inject(AuthserviceService).isAuthenticatedUser()
    ? true
    : inject(Router).createUrlTree(['login']);

};
