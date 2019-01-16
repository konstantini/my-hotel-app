import { Entity } from 'src/app/service/entity';

export class RoomType extends Entity {
  type: string;
  capacity: number;
  description: string;
}
