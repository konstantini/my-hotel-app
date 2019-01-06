import { DataTableModel } from 'src/app/common/data-table/data-table-model';

export class RoomType extends DataTableModel {
  type: string;
  capacity: number;
  description: string;
}
