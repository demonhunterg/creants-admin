import {Injectable} from '@angular/core';
import {BaThemeConfigProvider, colorHelper} from '../../../theme';

@Injectable()
export class PieChartService {

  constructor(private _baConfig:BaThemeConfigProvider) {
  }

  getData() {
    let pieColor = this._baConfig.get().colors.custom.dashboardPieChart;
    return [
      {
        color: pieColor,
        description: 'monitor.new_users',
        stats: '0',
        icon: 'person',
      },{
        color: pieColor,
        description: 'monitor.purchases',
        stats: '$ 0',
        icon: 'money',
      },  {
        color: pieColor,
        description: 'monitor.login_fail',
        stats: '$ 0',
        icon: 'money',
      }
    ];
  }
}
