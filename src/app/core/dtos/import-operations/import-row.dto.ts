import { ImportRawOperationDto } from './import-raw-operation.dto';

export interface ImportRowDto extends ImportRawOperationDto {
  doublon: 'none' | 'file' | 'releve';
  path: string;
}
