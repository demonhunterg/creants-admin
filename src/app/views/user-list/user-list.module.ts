import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing }       from './user-list.routing';
import { UserListComponent } from './user-list.component';
@NgModule({
  imports: [
    CommonModule, routing
  ],
  declarations: [UserListComponent]
})
export class UserListModule {
}
