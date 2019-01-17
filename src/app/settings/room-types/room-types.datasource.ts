import { MatSort } from '@angular/material';
import { RoomTypeService } from './room-type.service';

import { RoomType } from './room-type';
import { MyDataSource } from 'src/app/datasource/datasource';

export class RoomTypesDataSource extends MyDataSource<RoomType> {

    constructor(service: RoomTypeService, sort: MatSort) {
        super(service, sort);
    }

}
