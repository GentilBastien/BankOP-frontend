import {BaseDto} from "./BaseDto";

export interface OperationDto extends BaseDto {
  idMother?: number;
  date: string;
  price: number;
  manually_categorized: boolean;
}
