import { Component, OnInit } from '@angular/core';
import { ApiService } from '../ApiService';
import { Observable } from 'rxjs';
import { Note } from '../note/note';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent implements OnInit {
  
  title = 'my-first-app';

  // Observable ist ein Objekt aus der Reactive Extensions for JavaScript (RxJS) Bibliothek. Es repräsentiert einen asynchronen Datenstrom, der Werte über die Zeit emittieren kann.
  notes$: Observable<Note[]>;

  // Der Konstruktor wird aufgerufen, wenn eine Instanz der Komponente erstellt wird
  constructor(private apiService: ApiService) {}

  // Lifecycle-Hook-Methode. Diese Methode wird aufgerufen, nachdem Angular die Komponente initialisiert hat.
  ngOnInit(): void {
    this.notes$ = this.apiService.getNotes();
  }

}
