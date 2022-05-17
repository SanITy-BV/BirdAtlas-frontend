import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  @Input() displayName: string = '';
  @Output() logoutClicked = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  logout() {
    this.logoutClicked.emit();
  }
}
