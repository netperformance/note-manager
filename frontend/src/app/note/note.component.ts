import { Component, Input } from '@angular/core';
import { Note } from './note';
import { ApiService } from '../apiService';
import { DataService } from '../../../dataService';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrl: './note.component.css',
})
export class NoteComponent {
  
  @Input() note: Note;

  constructor(
    private apiService: ApiService,
    private dataService: DataService
  ) {}

  noteData: { title: string; message: string } = { title: '', message: '' };

  onDeleteNote(deletedItemId) {
    this.apiService.deleteNote(deletedItemId).subscribe(
      (response) => {
        console.log('Note deleted successfully:', response);
        // Informiere den Observable über die Änderung bzw. Löschung
        this.dataService.notifyItemDeleted(deletedItemId);
      },
      (error) => {
        console.error('Error deleting note:', error);
      }
    );
  }
}
