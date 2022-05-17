import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';
import { HomeComponent } from './home.component';

const routes = [
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [MsalGuard]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class HomeRoutingModule { }