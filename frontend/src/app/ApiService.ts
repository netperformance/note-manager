import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://localhost:8080/api/v1/note'; // Basis-URL für die API

  constructor(private http: HttpClient) {}

  // findAll
  getNotes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/findAll`);
  }

  // getNoteById
  getNoteById(noteId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${noteId}`);
  }

  // create
  createNote(noteData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/`, noteData);
  }

  // update
  updateNote(noteId: number, updatedData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${noteId}`, updatedData);
  }

  // delete
  deleteNote(noteId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${noteId}`);
  }

  // Heartbeat
  getHeartbeat(): Observable<string> {
    return this.http.get<string>(`${this.apiUrl}/heartbeat`);
  }

}
