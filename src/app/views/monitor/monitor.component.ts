import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageHandlerService } from '../../message-handler.service';
import { QAntDataSerializer } from '../../../qant_api/qant-data-serializer';
import { QAntObject } from '../../../qant_api/qant-object';
import {SystemRequest} from '../../../qant_api/system-request.enum'

@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.scss']
})
//https://github.com/formio/ng2-admin
//https://akveo.github.io/ng2-admin/articles/001-getting-started/
export class MonitorComponent implements OnInit {
  message:{} = {ccuMax: 0, sCpu: 0, totalMem: 0, maxMem: 0, freeMem: 0};

  pieData:QAntObject;

  constructor(private router:Router, private messageHandlerService:MessageHandlerService) {
    messageHandlerService.getDashboardListener().subscribe(message => this.handleMessage(message));
  }

  ngOnInit() {
  }

  public handleMessage(message:QAntObject) {
      this.message = message.toJson();
      this.pieData = message;
  }

  public joinBossEvent() {
    console.log("******** JOIN BOSS EVENT *********");
    var params = new QAntObject();
    params.putUtfString("rn", "Blood Castle");
    this.messageHandlerService.sendExtensionMessage("cmd_boss_event_join", params);
  }

  public hitBoss() {
    var params = new QAntObject();
    params.putInt("dam", 50);
    params.putInt("r", 1);
    this.messageHandlerService.sendExtensionMessage("cmd_boss_event_hit", params);
  }

  public getGiftEvents() {
    var params = new QAntObject();
    this.messageHandlerService.sendExtensionMessage("cmd_get_events", params);
  }

  public getHeroes() {
    var params = new QAntObject();
    this.messageHandlerService.sendExtensionMessage("cmd_heroes_list", params);
  }

  public getItems() {
    var params = new QAntObject();
    this.messageHandlerService.sendExtensionMessage("cmd_get_items", params);
  }

  public createRoom() {
    var params = new QAntObject();
    this.messageHandlerService.sendExtensionMessage("cmd_boss_room", params);
  }

}
