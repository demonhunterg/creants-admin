import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MailComponent } from './mail.component';
import { routing }       from './mail.routing';

@NgModule({
  imports: [
    CommonModule,
    routing
  ],
  declarations: [MailComponent]
})
export class MailModule { }
