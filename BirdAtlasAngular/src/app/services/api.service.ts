import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
  })
export class ApiService {
    constructor(private http: HttpClient) { }

    getBirds(): Observable<any> {
      return this.http.get(`${environment.apiUrl}/v1/Birds?amount=5`).pipe(catchError((error) => { return throwError(error) } ));
  }     
}