import { Injectable } from '@angular/core';
import { ImportStore } from './import-store';
import { map, Observable } from 'rxjs';
import { ImportRowDto } from '../../core/dtos/import-operations/import-row.dto';

@Injectable()
export class ImportUsecases {
  constructor(private readonly importStore: ImportStore) {}
  public selectedFileChanged(file: File | null): void {
    this.importStore.setSelectedFile(file);
  }

  public selectedFileChanges(): Observable<ImportRowDto[]> {
    return this.importStore.selectedFile$.pipe(
      map((file: File | null): ImportRowDto[] => (file ? this.parseCSVFile(file) : []))
    );
  }

  public parseCSVFile(file: File): ImportRowDto[] {
    //TODO
    console.log(file);
    return [];
  }
}
