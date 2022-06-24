import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';
import { BrowserUtils } from '@azure/msal-browser';
import { AppComponent } from './app.component';
import { roles } from './auth-config';
import { RoleGuard } from './guards/role.guard';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    canActivate: [MsalGuard, RoleGuard],
    data: { expectedRole: roles.TaskUser } 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    // Don't perform initial navigation in iframes or popups
    initialNavigation: !BrowserUtils.isInIframe() && !BrowserUtils.isInPopup() ? 'enabledNonBlocking' : 'disabled' // Set to enabledBlocking to use Angular Universal
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
