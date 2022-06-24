import { Injectable } from '@angular/core';
import { 
  CanActivate,
  ActivatedRouteSnapshot
} from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { AccountInfo } from '@azure/msal-common';

interface Account extends AccountInfo {
  idTokenClaims?: {
    roles?: string[]
  }
}

@Injectable({
    providedIn: 'root'
  })
export class RoleGuard implements CanActivate {

  constructor(private authService: MsalService) {}
  
  canActivate(route: ActivatedRouteSnapshot): boolean {
    
    const expectedRole = route.data['expectedRole'];
    let account: Account = this.authService.instance.getAllAccounts()[0];

    console.log('[ROLE GUARD] Account empty: ', account == undefined);

    if (account) {
      console.log();
      //Do some random test just to fake the role guard
      console.log('[ROLE GUARD] Account checking');

      if (!account.username?.includes('glenn')) {        
        return true;
      } else {
        return false;
      }
    }

    console.log('[ROLE GUARD] No account checking');
    return true;
  }
}