import { Injectable } from '@angular/core';
import { ImportStore } from './import-store';
import { EMPTY, Observable } from 'rxjs';
import { ImportRawOperationDto } from '../../core/dtos/import-operations/import-raw-operation.dto';
import { ImportOperation } from '../../core/entities/import-operations/import-operation';

@Injectable()
export class ImportUsecases {
  constructor(private readonly importStore: ImportStore) {}

  public operationsChanges(): Observable<ImportOperation[]> {
    return this.importStore.operations$;
  }

  public selectedFileChanges(): Observable<File | null> {
    return this.importStore.selectedFile$;
  }

  public isValidFile(file: File | null): boolean {
    return file === null || (file.type === 'text/csv' && file.size < 1_000_000);
  }

  public selectedFileChanged(file: File | null): void {
    this.importStore.setSelectedFile(file);
  }

  public async parseCSVFile(file: File | null): Promise<ImportRawOperationDto[]> {
    if (!file) return [];
    const rawOperations: ImportRawOperationDto[] = [];
    const raw: string = await file.text();
    const lines: string[] = raw.split('\n');
    lines.shift();
    lines.forEach(line => {
      const parsedLine: ImportRawOperationDto | null = this.parseCSVLine(line);
      if (parsedLine) {
        rawOperations.push(parsedLine);
      }
    });
    return rawOperations;
  }

  public fetchOperationFromRaw(importRawOperationDtos: ImportRawOperationDto[]): Observable<void> {
    if (importRawOperationDtos.length > 0) {
      return this.importStore.fetchOperationFromRaw(importRawOperationDtos);
    } else {
      this.importStore.clearOperationsFromRaw();
      return EMPTY;
    }
  }

  public clearOperationsFromRaw(): void {
    this.importStore.clearOperationsFromRaw();
  }

  private parseCSVLine(line: string): ImportRawOperationDto | null {
    if (line) {
      const regex: RegExp = /[^;]+/g;
      const fields: string[] = [];
      let match;
      while ((match = regex.exec(line)) !== null) {
        fields.push(match[0]);
      }
      return {
        date: fields[0],
        name: fields[2],
        price: parseFloat(fields[6].replace(',', '.')),
      };
    }
    return null;
  }
}
