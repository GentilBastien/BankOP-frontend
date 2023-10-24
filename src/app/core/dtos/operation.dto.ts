import { CrudBaseDto } from './crud-base.dto';

export interface OperationDto extends CrudBaseDto {
  idMother?: number;
  date: string;
  price: number;
  manually_categorized: boolean;
}
