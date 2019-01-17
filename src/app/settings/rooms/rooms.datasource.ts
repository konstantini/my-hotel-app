import { MyDataSource } from '../../datasource/datasource';
import { Room } from './room';
import { MatSort } from '@angular/material';
import { RoomsService } from './rooms.service';

export class RoomsDataSource extends MyDataSource<Room> {

    constructor(service: RoomsService, sort: MatSort) {
        super(service, sort);
    }

}
