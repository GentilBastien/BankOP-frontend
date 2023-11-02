export interface ImportOperation {
  doublon: 'none' | 'file' | 'releve';
  date: Date;
  name: string;
  price: number;
  categoryId: number;
  categoryName: string;
}
