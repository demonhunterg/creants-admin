import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

import {PieChartService} from './pieChart.service';
import { MessageHandlerService } from '../../../message-handler.service';
import { QAntObject } from '../../../../qant_api/qant-object';

import 'easy-pie-chart/dist/jquery.easypiechart.js';

@Component({
  selector: 'pie-chart',
  templateUrl: './pieChart.html',
  styleUrls: ['./pieChart.scss'],
  providers: [PieChartService]
})
// TODO: move easypiechart to component
export class PieChart implements OnInit, OnChanges {
  message:{} = {ccuMax: 3, sCpu: 0, totalMem: 0, maxMem: 0, freeMem: 0};
  public charts:Array<Object>;
  @Input()
    data:QAntObject;
  private _init = false;

  ngOnInit() {
  }

  ngOnChanges(changes:SimpleChanges) {
    if (this.data) {
      console.log("**********************  change data");
      console.log(this.data.toJson());
      this.message = this.data.toJson();
    }
  }

  constructor(private _pieChartService:PieChartService, private messageHandlerService:MessageHandlerService) {
    this.charts = this._pieChartService.getData();
  }


  ngAfterViewInit() {
    if (!this._init) {
      this._loadPieCharts();
      //this._updatePieCharts();
      this._init = true;
    }
  }

  private _loadPieCharts() {

    jQuery('.chart').each(function () {
      let chart = jQuery(this);
      chart.easyPieChart({
        easing: 'easeOutBounce',
        onStep: function (from, to, percent) {
          jQuery(this.el).find('.percent').text(Math.round(percent));
        },
        //barColor: jQuery(this).attr('data-rel'),
        barColor: 'rgba(255,255,255,0.8)',
        trackColor: 'rgba(0,0,0,0)',
        size: 84,
        scaleLength: 0,
        animation: 2000,
        lineWidth: 9,
        lineCap: 'round',
      });
    });
  }

  private _updatePieCharts() {
    let getRandomArbitrary = (min, max) => {
      return Math.random() * (max - min) + min;
    };

    jQuery('.pie-charts .chart').each(function (index, chart) {
      jQuery(chart).data('easyPieChart').update(getRandomArbitrary(55, 90));
    });
  }
}
