import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConnectionService {
  
  private baseUrl = 'http://localhost:8080/api/v1/note';

  constructor(private http: HttpClient) {}

  getHeartbeat(): Observable<string> {
    return this.http.get<string>(this.baseUrl + 'heartbeat');
  }

}
