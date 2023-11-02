import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ImportService } from '../../core/services/import.service';
import { ImportOperation } from '../../core/entities/import-operations/import-operation';
import { returnVoid } from '../../shared/custom-operators/ReturnVoid';
import { ImportOperationDto } from '../../core/dtos/import-operations/import-operation.dto';

@Injectable()
export class ImportStore {
  private selectedFileSubject: BehaviorSubject<File | null> = new BehaviorSubject<File | null>(null);
  public selectedFile$: Observable<File | null> = this.selectedFileSubject.asObservable();

  private operationsSubject: BehaviorSubject<ImportOperation[]> = new BehaviorSubject<ImportOperation[]>([]);
  public operations$: Observable<ImportOperation[]> = this.operationsSubject.asObservable();

  constructor(private readonly importService: ImportService) {}

  public fetchOperationFromOpDto(importOperationDtos: ImportOperationDto[]): Observable<void> {
    return this.importService.fetch(importOperationDtos).pipe(
      tap((importRows: ImportOperation[]) => this.operationsSubject.next(importRows)),
      returnVoid()
    );
  }

  public clearOpDto(): void {
    this.operationsSubject.next([]);
  }

  public setSelectedFile(file: File | null): void {
    this.selectedFileSubject.next(file);
  }
}
