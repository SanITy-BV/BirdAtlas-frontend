import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from "src/environments/environment";
import { Bird } from "src/app/models/bird";

@Injectable({
    providedIn: "root"
})
export class ApiService {
  constructor(private http: HttpClient) { }

  getBirds() {
    return this.http.get<Bird[]>(`${environment.apiUrl}/v1/Birds?amount=5`).pipe(catchError((error) => { return throwError(() => error) } ));
  }
}