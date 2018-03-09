//http://learnangular2.com/outputs/
import { Injectable, Output, EventEmitter } from '@angular/core';
import { QAntObject } from './qant-object';
import { QAntArrayObject } from './qant-array-object';
import { QAntUser } from './qant-user';
import { QAntRoom } from './qant-room';
import { SystemRequest } from './system-request.enum';

@Injectable()
export class QantApiService {
  public debug:boolean = false;
  public readyState:number;
  private ws:WebSocket;
  public messageEmitter = new EventEmitter();
  private qantUser:QAntUser;

  public getMessageEmitter() {
    return this.messageEmitter;
  }

  public getQAntUser() {
    return this.qantUser;
  }

  //Set up the default 'noop' event handlers
  public onopen:(ev:Event) => void = function (event:Event) {
    var params = new QAntObject();
  };

  public onclose:(ev:CloseEvent) => void = function (event:CloseEvent) {

  };

  public onconnecting:() => void = function () {
    console.log('on connecting......');
  };

  public onmessage:(ev:MessageEvent) => void = function (event:MessageEvent) {
    console.log("-------------------- onSocketMessage --------------------------");
    var int8Array = new Int8Array(event.data, 0);
    var message = QAntObject.newFromBinaryData(int8Array);
    console.log(message.toJson());
  };

  public onerror:(ev:ErrorEvent) => void = function (event:ErrorEvent) {

  };

  constructor() {
    console.log("Websocket is connecting............");
    this.readyState = WebSocket.CONNECTING;
    this.connect(false);
  }

  public connect(reconnectAttempt:boolean) {
    //this.ws = new WebSocket("ws://112.78.15.60:9494/ws");
    this.ws = new WebSocket("ws://192.168.1.75:9494/ws");
    //this.ws = new WebSocket("ws://mufantasy.creants.net:9494/ws");
    this.ws.binaryType = 'arraybuffer';
    this.onconnecting();

    this.ws.onopen = (event:Event) => {
      console.log("Websocket is open.");
      this.readyState = WebSocket.OPEN;
    };

    this.ws.onclose = (event:CloseEvent) => {
      console.log('Websocket is close');
      this.messageEmitter.emit(this.createSystemMessage(SystemRequest.Disconnect, new QAntObject()));
    };

    this.ws.onmessage = function (event) {
      var message = QAntObject.newFromBinaryData(new Int8Array(event.data, 0));
      console.log("--- response:");
      console.log(message.toJson());
      var controller = message.getTargetController();
      if (controller == 0) {
        var action = message.getValue("a");
        var params:QAntObject = message.getValue("p");
        if (action == SystemRequest.Login) {
          var ec = params.getValue("ec");
          if (ec != null) {
            console.log(params.getValue("rs"));
            if (ec == 44) {
              //  TODO emit lỗi để xử lý bên ngoài
              localStorage.removeItem("userInfo");
            }
            return;
          }

          var avatar = params.getValue("avt");
          var fullName = params.getValue("fn");
          var uid = params.getValue("uid");
          //đây là tên trong game
          var username = params.getValue("un");
          this.qantUser = new QAntUser(uid, fullName, avatar);
        }
        else if (action == SystemRequest.JoinRoom) {
          var roomInfoArr:QAntArrayObject = params.getValue("r");
          var id = roomInfoArr.getValue(0);
          var name = roomInfoArr.getValue(1);
          var groupId = roomInfoArr.getValue(2);
          var room = new QAntRoom(id, name, groupId);
          this.qantUser.setLastRoom(room);
          console.log(this.qantUser);
        }
        else if (action == SystemRequest.LeaveRoom || action == SystemRequest.Logout) {
          this.qantUser.setLastRoom(null);
        }
      }

      console.log("**************** EMIT MESSAGE ***************");
      this.messageEmitter.emit(message);
    }.bind(this);

    this.ws.onerror = (event) => {
      console.log('error...........' + event);
    };
  }


  private send(object) {
    var message = object.toBinary();
    this.ws && this.ws.send(message);
  }

  private createExtensionMessage(cmdName:String, extParams:QAntObject) {
    var params = new QAntObject();
    params.putUtfString("c", cmdName);
    if (extParams != null) {
      params.putQAntObject("p", extParams);
    }

    var object = new QAntObject();
    object.putByte("c", 1);
    //13 la send trong extension SystemRequest
    object.putShort("a", SystemRequest.CallExtension);
    var lastRoom = this.qantUser.getLastRoom();
    if (lastRoom != null) {
      params.putInt("r", lastRoom.getId());
    }
    object.putQAntObject("p", params);
    return object;
  }

  private createSystemMessage(cmdId:number, params:QAntObject) {
    var object = new QAntObject();
    object.putByte("c", 0);
    object.putShort("a", cmdId);
    object.putQAntObject("p", params);
    return object;
  }

  public sendSystemMessage(cmdId:number, params:QAntObject) {
    if (this.readyState == WebSocket.OPEN) {
      this.send(this.createSystemMessage(cmdId, params));
    } else {
      console.log("[WARN] socket not open yet. CMD=" + cmdId);
    }
  }

  public login(username:string, password:string, zoneName:string) {
    var params = new QAntObject();
    params.putUtfString("un", username);
    params.putUtfString("pw", password);
    params.putUtfString("zn", zoneName);
    this.sendSystemMessage(SystemRequest.Login, params);
  }

  public logout() {
    var params = new QAntObject();
    this.sendSystemMessage(SystemRequest.Logout, params);
  }

  public sendExtensionMessage(cmdName:String, params:QAntObject) {
    console.log(params.toJson());
    if (this.readyState == WebSocket.OPEN) {
      console.log("---------- request: " + cmdName);
      this.send(this.createExtensionMessage(cmdName, params));
    }
  }

}
