import { Component, OnInit } from '@angular/core';
import { MessageHandlerService } from '../../message-handler.service';
import { QAntDataSerializer } from '../../../qant_api/qant-data-serializer';
import { QAntObject } from '../../../qant_api/qant-object';

@Component({
  selector: 'app-reset-account',
  templateUrl: './reset-account.component.html',
  styleUrls: ['./reset-account.component.scss']
})
export class ResetAccountComponent implements OnInit {

  constructor(private messageHandlerService:MessageHandlerService) { }

  ngOnInit() {
  }

  public resetAccount(playerId:string) {
    var params = new QAntObject();
    params.putUtfString("__[[REQUEST_ID]]__", "resetAccount");

    var zn = "mus1";
    var data = new QAntObject();
    data.putUtfString("zn", zn);
    data.putUtfString("receivers", playerId);
    params.putQAntObject("data", data);

    this.messageHandlerService.sendExtensionMessage("game_master", params);
  }

}
