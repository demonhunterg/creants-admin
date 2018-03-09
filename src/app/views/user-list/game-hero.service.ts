import {Injectable} from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class GameHeroService {
  private gameHeroUrl:string = 'http://192.168.1.75:9490';

  constructor(private http:Http) {
  }

  public getUserList(page:number) {
    return this.doGet(this.gameHeroUrl + "/game-hero/page/" + page);
  }


  private doGet(url:string) {
    return this.http.get(url).map(res=>res.json());
  }
}
