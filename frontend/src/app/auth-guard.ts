import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { log } from 'console';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  // ✅ Check if running in browser (not SSR)
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('jwt');
    console.log("Auth Guard Token:", token); // Debugging line
    if (token) {
      return true; // user is authenticated
    }
  }

  // Redirect unauthenticated users to login
  router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
  return false;
};
