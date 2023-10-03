import {BaseEntity} from "./BaseEntity";

export interface Operation extends BaseEntity {
  idMother?: number;
  date: string;
  price: number;
  manually_categorized: boolean;
}
