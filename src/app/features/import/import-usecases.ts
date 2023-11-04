import { Injectable } from '@angular/core';
import { ImportStore } from './import-store';
import { EMPTY, Observable } from 'rxjs';
import { ImportOperation } from '../../core/entities/import-operations/import-operation';
import { ImportOperationDto } from '../../core/dtos/import-operations/import-operation.dto';

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

  public async parseCSVFile(file: File | null): Promise<ImportOperationDto[]> {
    if (!file) return [];
    const importOperationDtos: ImportOperationDto[] = [];
    const raw: string = await file.text();
    const lines: string[] = raw.split('\n');
    lines.shift();
    lines.forEach(line => {
      const parsedLine: ImportOperationDto | null = this.parseCSVLine(line);
      if (parsedLine) {
        importOperationDtos.push(parsedLine);
      }
    });
    return importOperationDtos;
  }

  public fetchOperationFromOpDto(importOperationDtos: ImportOperationDto[]): Observable<void> {
    if (importOperationDtos.length > 0) {
      return this.importStore.fetchOperationFromOpDto(importOperationDtos);
    } else {
      this.importStore.clearOpDto();
      return EMPTY;
    }
  }

  public pushOperations(): void {
    this.importStore.pushOperations();
  }

  private parseCSVLine(line: string): ImportOperationDto | null {
    if (line) {
      const regex: RegExp = /[^;]+/g;
      const fields: string[] = [];
      let match;
      while ((match = regex.exec(line)) !== null) {
        fields.push(match[0]);
      }
      return {
        date: fields[0],
        name: fields[2].slice(1, -1),
        price: parseFloat(fields[6].replace(',', '.')),
      };
    }
    return null;
  }
}
