import { CrudBaseEntity } from './crud-base.entity';

export interface Operation extends CrudBaseEntity {
  idMother?: number;
  date: Date;
  price: number;
  manually_categorized: boolean;
}
