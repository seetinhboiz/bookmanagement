import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommunicationService {
  constructor() {}

  private reloadSubject = new Subject<void>();

  get reloadObservable() {
    return this.reloadSubject.asObservable();
  }

  triggerReload() {
    this.reloadSubject.next();
  }
}
