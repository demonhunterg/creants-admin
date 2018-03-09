import { Component, OnInit } from '@angular/core';
import { MessageHandlerService } from '../../message-handler.service';
import { QAntDataSerializer } from '../../../qant_api/qant-data-serializer';
import { QAntObject } from '../../../qant_api/qant-object';

@Component({
  selector: 'app-mail',
  templateUrl: './mail.component.html',
  styleUrls: ['./mail.component.scss']
})
export class MailComponent implements OnInit {

  constructor(private messageHandlerService:MessageHandlerService) {
  }

  ngOnInit() {
  }

  public sendMail(title:string, content:string, playerId:string, giftString:string) {
    var params = new QAntObject();
    params.putUtfString("__[[REQUEST_ID]]__", "sendMail");

    var zn = "mus1";
    var mailData = new QAntObject();
    mailData.putUtfString("title", title);
    mailData.putUtfString("content", content);
    mailData.putUtfString("zn", zn);
    mailData.putUtfString("receivers", playerId);
    if (giftString) {
      mailData.putUtfString("giftString", giftString);
    }

    params.putQAntObject("data", mailData);

    this.messageHandlerService.sendExtensionMessage("game_master", params);

    console.log("title:" + title + "/content:" + content + "/playerId:" + playerId + "/giftString:" + giftString);
  }

}
