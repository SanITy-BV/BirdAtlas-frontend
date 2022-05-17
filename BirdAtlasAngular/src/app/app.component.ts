import { Component, OnInit, Inject } from '@angular/core';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = environment.ProjectName;
  isIframe = false;
  displayName: string = '';

  constructor() { }

  ngOnInit() {
    this.isIframe = window !== window.parent && !window.opener;
    this.displayName = "John Wick";
  }
}