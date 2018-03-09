import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing }       from './setting.routing';
import { SettingComponent } from './setting.component';
@NgModule({
  imports: [
    CommonModule, routing
  ],
  declarations: [SettingComponent]
})
export class SettingModule {
}
