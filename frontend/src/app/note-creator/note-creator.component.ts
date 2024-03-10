import { Component } from '@angular/core';
import { ApiService } from '../apiService';

@Component({
  selector: 'app-note-creator',
  templateUrl: './note-creator.component.html',
  styleUrl: './note-creator.component.css',
})
export class NoteCreatorComponent {
  constructor(private apiService: ApiService) {}

  noteData: { title: string; message: string } = { title: '', message: '' };

  onSaveNote() {
    this.apiService.createNote(this.noteData).subscribe(
      (response) => {
        console.log('Erfolgreich gespeichert:', response);
        // Hier kannst du zusätzliche Aktionen nach erfolgreicher Speicherung durchführen
      },
      (error) => {
        console.error('Fehler beim Speichern:', error);
        // Hier kannst du Fehlerbehandlungen durchführen
      }
    );
  }
}
