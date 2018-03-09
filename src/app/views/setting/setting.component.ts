import { Component, OnInit } from '@angular/core';
import { GameSettingService } from './game-setting.service';


@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss'],
  providers: [GameSettingService]
})
export class SettingComponent implements OnInit {
  private fileList:any;
  private fileContent:string;

  constructor(private gameSettingService:GameSettingService) {
    gameSettingService.getFileList().subscribe(response=> {
      this.fileList = response;
      console.log(response);
    }, err => {
      console.log(err);
    });
  }

  ngOnInit() {
  }

  viewFile(fileName:string) {
    this.gameSettingService.viewFile(fileName).subscribe(response=> {
      this.fileContent = response;
    }, err => {
      console.log(err);
    });
  }

}
