import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

// Der Dekorator, der Angular darüber informiert, dass es sich bei der Klasse um einen Injectable handelt, der von anderen Teilen der Anwendung verwendet werden kann.
@Injectable({
  providedIn: 'root',
})
export class DataService {

  // Observable
  private deletedItemSubject = new Subject<number>();
  // Observable Kapselung & Immutabilität für andere Klassen
  deletedItem$ = this.deletedItemSubject.asObservable();

  // Methode, um andere Teile der Anwendung über ein gelöschtes Element zu benachrichtigen
  // 'next' wird verwendet, um einen neuen Wert im Datenstrom zu senden
  notifyItemDeleted(id: number) {
    this.deletedItemSubject.next(id);
  }

}
