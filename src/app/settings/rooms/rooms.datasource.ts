import { MyDataSource } from './datasource';
import { Room } from './room';
import { MatSort } from '@angular/material';
import { RoomsService } from './rooms.service';

export class RoomsDataSource extends MyDataSource<Room> {

    constructor(service: RoomsService, sort: MatSort) {
        super(service, sort);
    }

    public update(room: Room): void {
        super.update(room, (a: Room, b: Room) => a.id === b.id);
    }

    public delete(room: Room): void {
        super.delete(room, (a: Room, b: Room) => a.id === b.id);
    }

}
