import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConnectionService {
  
  private apiUrl = 'http://localhost:8080/api/v1/note';

  constructor(private http: HttpClient) {}

  getData(endpoint: string) {
    const url = `${this.apiUrl}/${endpoint}`;

    return this.http.get(url).pipe(catchError(this.handleError));
  }

  private handleError(error: any) {
    return throwError('Es gab ein Problem bei der Verbindung zur Datenbank.');
  }

}
