import {Injectable} from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class GameSettingService {
  private settingUrl:string = 'http://192.168.1.75:9490/game-setting';

  constructor(private http:Http) {

  }

  public getFileList() {
    return this.doGet(this.settingUrl + "/file/list");
  }

  public viewFile(fileName:string) {
    return this.doGet1(this.settingUrl + "/file/view/" + fileName);
  }


  private doGet(url:string) {
    return this.http.get(url).map(res=>res.json());
  }

  private doGet1(url:string) {
    return this.http.get(url).map(res=> {
      return res["_body"];
    });
  }
}
