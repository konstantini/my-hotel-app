import { RoomType } from '../room-types/room-type';
import { Entity } from 'src/app/service/entity';

export class Room extends Entity {
    number: string;
    type: RoomType;
}
