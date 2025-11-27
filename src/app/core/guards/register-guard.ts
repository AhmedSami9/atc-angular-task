import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const registerGuard: CanActivateFn = (route, state) => {
 const _PLATFORM_ID =inject(PLATFORM_ID)
  const _Router =inject(Router)
   if (!isPlatformBrowser(_PLATFORM_ID)) {
    _Router.navigate(['./login']);
    return false;
  }

  const token = localStorage.getItem("userToken");
  const userSession = localStorage.getItem("userSession");

  if (token && userSession) {
     _Router.navigate(['./dashboard']);
    return false;
  } else {
    return true;
  }
};