import { Component } from '@angular/core';
import { ApiService } from '../apiService';
import { DataService } from '../../../dataService';

@Component({
  selector: 'app-note-creator',
  templateUrl: './note-creator.component.html',
  styleUrl: './note-creator.component.css',
})
export class NoteCreatorComponent {
  constructor(
    private apiService: ApiService,
    private dataService: DataService
  ) {}

  noteData: { title: string; message: string; date?: Date } = {
    title: '',
    message: '',
    date: new Date(),
  };

  onSaveNote() {
    if (this.isValidForm()) {
      // Aktualisiere das Erstellungsdatum vor dem Speichern
      this.noteData.date = new Date();

      this.apiService.createNote(this.noteData).subscribe(
        (response) => {
          console.log('Erfolgreich gespeichert:', response);
          this.dataService.notifyItemAdded(response.id);
        },
        (error) => {
          console.error('Fehler beim Speichern:', error);
        }
      );
    }
  }

  isValidForm(): boolean {
    return (
      this.noteData.title.trim() !== '' || this.noteData.message.trim() !== ''
    );
  }
}
