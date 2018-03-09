import { Injectable, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { QantApiService } from './../qant_api/qant-api.service';
import { QAntObject } from './../qant_api/qant-object';
import {SystemRequest} from './../qant_api/system-request.enum';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class MessageHandlerService {
  private logoutListener = new EventEmitter();
  private loginListener = new EventEmitter();
  private joinGameListener = new EventEmitter();
  private notificationListener = new EventEmitter();
  private ccuListener = new EventEmitter();
  private dashboardListener = new EventEmitter();
  private disconnectListener = new EventEmitter();

  constructor(private router:Router,private qantApiService:QantApiService) {
    qantApiService.getMessageEmitter().subscribe(message => this.handleMessage(message));
    console.log("********************************* CREATE ************************");
    var params = new QAntObject();
    params.putUtfString("__[[REQUEST_ID]]__", "getData");
    Observable.interval(2000).subscribe(x => {
      var url = this.router.url;
      if (url == "/views/monitor") {
        this.sendExtensionMessage("dashboard", params);
      }
    });
  }

  public handleMessage(message:QAntObject) {
    var params = null;
    var controller = message.getTargetController();
    //0: system, 1: extension
    if (controller == 0) {
      var action = message.getValue("a");
      params = message.getValue("p");
      if (action == SystemRequest.Login) {
        this.loginListener.emit(params);
      } else if (action == SystemRequest.Logout) {
        this.logoutListener.emit(params);
      }else if(action == SystemRequest.Disconnect){
        this.disconnectListener.emit(params);
      }

    } else {
      var object = message.getValue("p");
      params = object.getValue("p");
      var cmdId = object.getCmdAction();
      console.log("******************** request cmd: " + cmdId);
      switch (cmdId) {
        case "join_game":
          this.joinGameListener.emit(params);
          break;
        case "dashboard.data":
          this.dashboardListener.emit(params);
          break;

        default :
          console.log("[WARN]--------------- not process");
          console.log(message.toJson());
          console.log(cmdId);
          break;
      }
    }

  }

  public sendSystemMessage(cmdId:number, params:QAntObject) {
    this.qantApiService.sendSystemMessage(cmdId, params);
  }

  public sendExtensionMessage(cmdName:String, params:QAntObject) {
    this.qantApiService.sendExtensionMessage(cmdName, params);
  }

  public getJoinGameListener() {
    return this.joinGameListener;
  }

  public getLoginListener() {
    return this.loginListener;
  }

  public getLogoutListener() {
    return this.logoutListener;
  }
  public getDisconnectListener() {
    return this.disconnectListener;
  }

  public getNotificationListener() {
    return this.notificationListener;
  }

  public getCCUListener() {
    return this.ccuListener;
  }

  public getDashboardListener() {
    return this.dashboardListener;
  }

}
