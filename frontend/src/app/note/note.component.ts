import { Component, Input } from '@angular/core';
import { ApiService } from '../apiService';
import { DataService } from '../../../dataService';
import { Note } from './note';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css'],
})
export class NoteComponent {
  @Input() note: Note;

  isEditing = false;
  editedTitle: string = '';
  editedMessage: string = '';

  constructor(
    private apiService: ApiService,
    private dataService: DataService
  ) {}

  onDeleteNote(deletedItemId) {
    this.apiService.deleteNote(deletedItemId).subscribe(
      (response) => {
        console.log('Note deleted successfully:', response);
        this.dataService.notifyItemDeleted(deletedItemId);
      },
      (error) => {
        console.error('Error deleting note:', error);
      }
    );
  }

  onUpdateNote() {
    this.isEditing = true;
    this.editedTitle = this.note.title;
    this.editedMessage = this.note.message;
  }

  // update
  saveChanges() {
    // Hier kannst du die aktualisierten Werte speichern
    this.isEditing = false;

    // Beispiel: Aktualisiere die Werte über den API-Service
    this.apiService.updateNote(
      this.note.id, {
      title: this.editedTitle,
      message: this.editedMessage,
    }).subscribe(
      (response) => {
        console.log('Note updated successfully:', response);
        this.dataService.notifyItemUpdated(response.id);
      },
      (error) => {
        console.error('Error updating note:', error);
      }
    );
  }

  // Methode zum Starten der Bearbeitung
  startEditing() {
    this.isEditing = true;
    this.editedTitle = this.note.title;
    this.editedMessage = this.note.message;
  }

  // Methode zum Abbrechen der Bearbeitung
  cancelEditing() {    
    this.isEditing = false;
  }

}
