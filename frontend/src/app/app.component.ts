import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Note } from './note/note';
import { ApiService } from './apiService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'note-manager';
}
