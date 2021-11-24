import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Bird } from 'src/app/models/bird';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'birdatlas';
  birds: Bird[] = [];

  constructor(private apiService : ApiService) { }  

  ngOnInit(): void {
    this.apiService.getBirds().subscribe((resp) => {
      this.birds = resp;
      console.log(this.birds);
    });
  }
}