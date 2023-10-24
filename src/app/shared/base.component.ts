import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, tap } from 'rxjs';
import { CrudBaseService } from '../core/services/crud-base.service';
import { CrudBaseEntity } from '../core/entities/crud-base.entity';

export abstract class BaseComponent {
  protected createFormGroup!: FormGroup;
  protected deleteFormGroup!: FormGroup;
  protected dataSource: MatTableDataSource<CrudBaseEntity> = new MatTableDataSource<CrudBaseEntity>();

  protected constructor(
    private readonly baseService: CrudBaseService,
    private readonly fb: FormBuilder
  ) {
    this.baseService
      .fetchAllEntities()
      .pipe(
        map(baseEntities => [...baseEntities].sort((b1, b2) => Number(b1.id) - Number(b2.id))),
        tap(baseEntities => (this.dataSource = new MatTableDataSource<CrudBaseEntity>(baseEntities)))
      )
      .subscribe();
    this.createFormGroup = this.createDynamicFormGroup();
    this.deleteFormGroup = this.fb.group({
      id: ['', Validators.required],
    });
  }

  protected objKeys(): string[] {
    return ['id', 'idCategory', 'name'];
  }

  protected submitCreate(): void {
    if (this.createFormGroup.valid) {
      const values: string[] = this.retrieveInputsFromCreateFormGroup();
      this.baseService.createEntity(values);
    }
  }

  protected submitDelete(): void {
    if (this.deleteFormGroup.valid) {
      const id: string = this.deleteFormGroup.value.id;
      this.baseService.deleteEntity(id);
    }
  }

  private createDynamicFormGroup(): FormGroup {
    const formGroupConfig: { [key: string]: string[] } = {};
    this.objKeys().forEach((key, index) => {
      if (index === 0) return;
      formGroupConfig[key] = [''];
    });
    return this.fb.group(formGroupConfig);
  }

  private retrieveInputsFromCreateFormGroup(): string[] {
    const inputs: string[] = [];
    this.objKeys().forEach(key => inputs.push(this.createFormGroup.get(key)?.value));
    return inputs;
  }
}
