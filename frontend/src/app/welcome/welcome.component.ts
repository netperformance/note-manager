import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from '../apiService';
import { Observable, Subscription, map, switchMap } from 'rxjs';
import { Note } from '../note/note';
import { DataService } from '../../../dataService';
import { ConnectionService } from '../../../connectionService';

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
  private updatedItemSubscription: Subscription;

  // Observable ist ein Objekt aus der Reactive Extensions for JavaScript (RxJS) Bibliothek. Es repräsentiert einen asynchronen Datenstrom, der Werte über die Zeit emittieren kann.
  notes$: Observable<Note[]>;

  // Der Konstruktor wird aufgerufen, wenn eine Instanz der Komponente erstellt wird
  constructor(
    private connectionService: ConnectionService,
    private apiService: ApiService,
    private dataService: DataService
  ) {
    // Subsription von Observable
    this.deletedItemSubscription = this.dataService.deletedItem$.subscribe(
      (deletedItemId) => {
        this.handleItemDeletion(deletedItemId);
      }
    );
    this.addedItemSubscription = this.dataService.addedItem$.subscribe(
      (addedItemId) => {
        this.handleItemAddition(addedItemId);
      }
    );
    this.updatedItemSubscription = this.dataService.updatedItem$.subscribe(
      (updatedItemId) => {
        this.handleItemUpdate(updatedItemId);
      }
    );
  }

  // Logik zum Aktualisieren der Liste nach Löschvorgang.
  handleItemDeletion(deletedItemId: number) {
    this.notes$ = this.notes$.pipe(
      map((notes) => notes.filter((note) => note.id !== deletedItemId))
    );
  }

  handleItemAddition(addedItemId: number) {
    this.notes$ = this.apiService.getNotes();
  }

  handleItemUpdate(updatedItemId: number) {
    this.getLocalUpdatedNote(updatedItemId).subscribe(
      (updatedNote) => {
        // pipe ist eine Funktion in RxJS, die auf Observables angewendet wird, um Transformationen durchzuführen.
        this.notes$ = this.notes$.pipe(
          // Der map-Operator ist eine Transformation, die auf jeden Wert im Observable angewendet wird.
          // In diesem Fall wird map verwendet, um die Liste der Notizen zu durchlaufen und die aktualisierte Note an der Stelle zu platzieren, an der die ID mit updatedItemId übereinstimmt.
          map((notes) =>
            notes.map((note) =>
              note.id === updatedItemId ? updatedNote : note
            )
          )
        );
      },
      (error) => {
        console.error('Error updating note locally:', error);
      }
    );
  }

  getLocalUpdatedNote(updatedItemId: number): Observable<Note> {
    return this.apiService.getNoteById(updatedItemId);
  }

  // Lifecycle-Hook-Methode. Diese Methode wird aufgerufen, nachdem Angular die Komponente initialisiert hat.
  ngOnInit(): void {
    this.notes$ = this.apiService.getNotes();
    // this.checkDatabaseConnection();
  }

  ngOnDestroy() {
    // Das Abonnement beenden, nachdem die Komponente zerstört wurde
    // Wenn eine Komponente zerstört wird, aber das Abonnement nicht aufgehoben wird, bleibt das Abonnement bestehen, und die Komponente könnte weiterhin auf Ereignisse reagieren, die sie eigentlich nicht mehr betrifft.
    this.deletedItemSubscription.unsubscribe();
    this.addedItemSubscription.unsubscribe();
    this.updatedItemSubscription.unsubscribe();
  }

  /*/
  checkDatabaseConnection() {
    this.notes$ = this.apiService.getNotes();

    // console.log("------------> "+this.apiService.getHeartbeat());
    this.apiService.getHeartbeat().subscribe(
      (response: string) => {
        console.log("------------> " + response);
        // Hier können Sie weitere Aktionen mit der Antwort durchführen
      },
      (error) => {
        console.error('Fehler beim Abrufen des Heartbeat:', error);
      }
    );
  } 
  //*/
}
