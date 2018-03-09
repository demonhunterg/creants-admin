import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing }       from './monitor.routing';
import {MonitorComponent} from './monitor.component'
import { NgaModule } from '../../theme/nga.module';
import { AppTranslationModule } from '../../app.translation.module';
import {PieChart} from './pieChart/pieChart.component';
import { FileSizeUtils } from './file-size.pipe';


@NgModule({
  imports: [
    CommonModule,
    NgaModule,
    AppTranslationModule,
    routing
  ],
  declarations: [MonitorComponent, PieChart, FileSizeUtils]
})
export class MonitorModule {
}
