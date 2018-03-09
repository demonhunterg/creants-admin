import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResetAccountComponent } from './reset-account.component';
import { routing }       from './reset-account.routing';

@NgModule({
  imports: [
    CommonModule,
    routing
  ],
  declarations: [ResetAccountComponent]
})
export class ResetAccountModule { }
