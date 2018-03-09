import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';

import { routing }       from './views.routing';
import { NgaModule } from '../theme/nga.module';
import { AppTranslationModule } from '../app.translation.module';
import { MoneyLogComponent } from './money-log/money-log.component';
import { ViewsComponent } from './views.component';



@NgModule({
  imports: [CommonModule, AppTranslationModule, NgaModule, routing],
  declarations: [ViewsComponent, MoneyLogComponent]
})
export class ViewsModule {
}
