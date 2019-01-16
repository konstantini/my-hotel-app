import { RoomType } from '../room-types/room-type';

export class Room {
    id: number;
    number: string;
    type: RoomType;

    isForEdit: boolean;
}
