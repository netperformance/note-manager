import { Component, Input } from '@angular/core';
import { Note } from './note';
import { ApiService } from '../ApiService';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrl: './note.component.css'
})
export class NoteComponent {

  @Input() note: Note;

  constructor(private apiService: ApiService) {}

  noteData: { title: string; message: string } = { title: '', message: '' };

  onDeleteNote(id) {
    this.apiService.deleteNote(id).subscribe(
      (response) => {
        console.log('Note deleted successfully:', response);
      },
      (error) => {
        console.error('Error deleting note:', error);
      }
    );
  }

}
