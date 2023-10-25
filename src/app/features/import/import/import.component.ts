import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ReleveRowDto } from '../../../core/dtos/releve-operations/releve-row.dto';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ImportUsecases } from '../import-usecases';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.scss'],
})
export class ImportComponent {
  protected dataSource: MatTableDataSource<ReleveRowDto>;
  protected displayedColumns: string[] = ['doublon', 'date', 'name', 'price', 'path'];
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  constructor(private readonly importUsecases: ImportUsecases) {
    this.dataSource = new MatTableDataSource<ReleveRowDto>();
  }

  protected openFileView(): void {
    this.fileInput.nativeElement.click();
  }

  protected filesChanged(): void {
    const fileList: FileList | null = this.fileInput.nativeElement.files;
    const file: File | null = fileList ? fileList.item(0) : null;
    this.importUsecases.selectedFileChanged(file);
  }
}
