import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { HeadmastComponent } from './headmast.component';
import { NavigationComponent } from './navigation.component';
import { FooterComponent } from './footer.component';

@NgModule({
  declarations: [
    HeaderComponent,
    HeadmastComponent,
    NavigationComponent,
    FooterComponent    
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CommonModule,
    HeaderComponent,
    HeadmastComponent,
    NavigationComponent,
    FooterComponent
  ]
})
export class DesignModule { }