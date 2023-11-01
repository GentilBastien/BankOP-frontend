import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ImportUsecases } from '../import-usecases';
import { from, Observable, switchMap, tap } from 'rxjs';
import { ImportRawOperationDto } from '../../../core/dtos/import-operations/import-raw-operation.dto';
import { ImportOperation } from '../../../core/entities/import-operations/import-operation';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.scss'],
})
export class ImportComponent implements OnInit, AfterViewInit {
  protected dataSource: MatTableDataSource<ImportOperation>;
  protected displayedColumns: string[] = ['doublon', 'date', 'name', 'price', 'path'];
  protected selectedFile: File | null;
  protected operations$: Observable<ImportOperation[]>;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  constructor(private readonly importUsecases: ImportUsecases) {
    this.dataSource = new MatTableDataSource<ImportOperation>();
    this.selectedFile = null;
    this.operations$ = this.importUsecases.selectedFileChanges().pipe(
      tap((file: File | null) => (this.selectedFile = file)),
      switchMap((file: File | null) => from(this.importUsecases.parseCSVFile(file))),
      switchMap((importRawOpDtos: ImportRawOperationDto[]) =>
        this.importUsecases.fetchOperationFromRaw(importRawOpDtos)
      ),
      switchMap(() => this.importUsecases.operationsChanges()),
      tap((rows: ImportOperation[]) => (this.dataSource.data = rows))
    );
  }

  public ngOnInit(): void {
    this.operations$.subscribe();
  }

  public ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  protected openFileView(): void {
    this.fileInput.nativeElement.click();
  }

  protected changeFile(): void {
    const fileList: FileList | null = this.fileInput.nativeElement.files;
    const file: File | null = fileList ? fileList.item(0) : null;
    if (this.importUsecases.isValidFile(file)) {
      this.importUsecases.selectedFileChanged(file);
    } else {
      this.fileInput.nativeElement.value = '';
      if (file) {
        console.log(
          'invalid file, SIZE:',
          file.size,
          'MAX SIZE:',
          1_000_000,
          'TYPE:',
          file.type,
          'ACCEPTED TYPE: text/csv'
        );
      }
    }
  }

  protected resetFile(): void {
    this.fileInput.nativeElement.value = '';
    this.importUsecases.selectedFileChanged(null);
  }
}
