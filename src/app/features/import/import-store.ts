import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class ImportStore {
  private selectedFileSubject: BehaviorSubject<File | null> = new BehaviorSubject<File | null>(null);
  public selectedFile$: Observable<File | null> = this.selectedFileSubject.asObservable();

  public setSelectedFile(file: File | null): void {
    this.selectedFileSubject.next(file);
  }
}
