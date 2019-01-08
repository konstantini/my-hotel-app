import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { RoomsComponent } from './settings/rooms/rooms.component';
import { RoomTypesComponent } from './settings/room-types/room-types.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  { path: "dashboard", component: DashboardComponent },
  { path: "settings", children: [
    { path: "", component: SettingsComponent, pathMatch: 'full' },
    { path: "rooms", component: RoomsComponent },
    { path: "room-types", component: RoomTypesComponent },
  ] },
  { path: "profile", component: UserProfileComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
