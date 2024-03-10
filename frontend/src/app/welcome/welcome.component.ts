import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from '../apiService';
import { Observable, Subscription, map } from 'rxjs';
import { Note } from '../note/note';
import { DataService } from '../../../dataService';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css',
})
export class WelcomeComponent implements OnInit, OnDestroy {
  title = 'note-manager';

  // Instanz der Subscription-Klasse aus RxJS. Es wird verwendet, um das Abonnement auf den deletedItem$-Observable des DataService zu repräsentieren. 
  // Dieses Abonnement wird in der ngOnDestroy-Methode am Ende der Lebensdauer der Komponente aufgehoben, um potenzielle Speicherlecks zu vermeiden.
  private deletedItemSubscription: Subscription;
  private addedItemSubscription: Subscription;

  // Observable ist ein Objekt aus der Reactive Extensions for JavaScript (RxJS) Bibliothek. Es repräsentiert einen asynchronen Datenstrom, der Werte über die Zeit emittieren kann.
  notes$: Observable<Note[]>;

  // Der Konstruktor wird aufgerufen, wenn eine Instanz der Komponente erstellt wird
  constructor(
    private apiService: ApiService,
    private dataService: DataService
  ) {
    // Subsription von Observable
    this.deletedItemSubscription = this.dataService.deletedItem$.subscribe (
      (deletedItemId) => {
        this.handleItemDeletion(deletedItemId);
      }
    );
    this.addedItemSubscription = this.dataService.addedItem$.subscribe(
      (addedItemId) => {
        this.handleItemAddition(addedItemId);
      }
    );
  }

  // Logik zum Aktualisieren der Liste nach Löschvorgang.
  handleItemDeletion(deletedItemId: number) {
    this.notes$ = this.notes$.pipe(
      map(notes => notes.filter(note => note.id !== deletedItemId))
    );
  }

  handleItemAddition(addedItemId: number) {
    this.notes$ = this.apiService.getNotes();
  }

  // Lifecycle-Hook-Methode. Diese Methode wird aufgerufen, nachdem Angular die Komponente initialisiert hat.
  ngOnInit(): void {
    this.notes$ = this.apiService.getNotes();
  }

  ngOnDestroy() {
    // Das Abonnement beenden, nachdem die Komponente zerstört wurde
    // Wenn eine Komponente zerstört wird, aber das Abonnement nicht aufgehoben wird, bleibt das Abonnement bestehen, und die Komponente könnte weiterhin auf Ereignisse reagieren, die sie eigentlich nicht mehr betrifft.
    this.deletedItemSubscription.unsubscribe();
    this.addedItemSubscription.unsubscribe();
  }

}
