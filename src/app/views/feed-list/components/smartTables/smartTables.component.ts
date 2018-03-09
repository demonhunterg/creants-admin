import { Component } from '@angular/core';

import { SmartTablesService } from './smartTables.service';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'smart-tables',
  templateUrl: './smartTables.html',
  styleUrls: ['./smartTables.scss'],
  providers: [SmartTablesService]
})
export class SmartTables {

  query:string = '';

  settings = {
    add: {
      addButtonContent: '<i class="ion-ios-plus-outline"></i>',
      createButtonContent: '<i class="ion-checkmark"></i>',
      cancelButtonContent: '<i class="ion-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="ion-edit"></i>',
      saveButtonContent: '<i class="ion-checkmark"></i>',
      cancelButtonContent: '<i class="ion-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="ion-trash-a"></i>',
      confirmDelete: true
    },
    columns: {
      id: {
        title: 'ID',
        type: 'string'
      },
      title: {
        title: 'Tiêu Đề',
        type: 'string'
      },
      shortContent: {
        title: 'Nội Dung',
        type: 'string'
      },
      createTime: {
        title: 'Ngày Tạo',
        type: 'date'
      },
      author: {
        title: 'Tác giả',
        type: 'string'
      },
      category: {
        title: 'Danh mục',
        type: 'string'
      }
    }
  };

  source:LocalDataSource = new LocalDataSource();

  constructor(protected service:SmartTablesService) {
    this.service.getData().then((data) => {
      console.log(data);
      this.source.load(data);
    });

  }

  onDeleteConfirm(event):void {
    if (window.confirm('Chắc chắn xóa bài không?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
}
