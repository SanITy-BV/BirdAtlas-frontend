import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';
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

  constructor(private apiService : ApiService, private spinner : NgxSpinnerService) { }  

  ngOnInit(): void {
    this.spinner.show();
    
    this.apiService.getBirds()
      .pipe(finalize(() => this.spinner.hide()))
      .subscribe(
        resp => {
          this.birds = resp;
          console.log(this.birds);        
        }
      );
  }
}