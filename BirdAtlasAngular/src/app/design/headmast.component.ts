import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-headmast',
  templateUrl: './headmast.component.html',
  styleUrls: ['./headmast.component.scss']
})
export class HeadmastComponent implements OnInit {
  @Input() backTo: string = '';

  projectName: string = environment.ProjectName;

  constructor() { }

  ngOnInit(): void {
  }
}