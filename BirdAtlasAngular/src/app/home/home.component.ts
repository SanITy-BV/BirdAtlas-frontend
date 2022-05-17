import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(
    private apiService: ApiService) { }

  getBirds() {
    this.apiService.getBirds().subscribe((resp)=> {
      console.log(resp);
    });
  }
}