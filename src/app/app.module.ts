import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SettingsComponent } from './settings/settings.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { RoomsComponent } from './settings/rooms/rooms.component';
import { RoomTypesComponent } from './settings/room-types/room-types.component';
import { DataTableComponent } from './common/data-table/data-table.component';
import { PageableDataTableComponent } from './common/pageable-data-table/pageable-data-table.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SettingsComponent,
    UserProfileComponent,
    RoomsComponent,
    RoomTypesComponent,
    DataTableComponent,
    PageableDataTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
