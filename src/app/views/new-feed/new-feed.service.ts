import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class NewFeedService {
  private articleUrl:string = 'http://localhost:9491';

  constructor(private http:Http) {
  }

  public postNewFeed(title:string, content:string, categoryId:string) {
    let params = new URLSearchParams();
    params.append('title', title);
    params.append('content', content);
    params.append('categoryId', categoryId);
    return this.doPost(this.articleUrl + "/article/post", params);
  }

  private doPost(url:string, params:URLSearchParams) {
    let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
    let options = new RequestOptions({headers: headers});
    let body = params.toString();

    return this.http.post(url, body, options).map(res=>res.json() as JSON);
  }

  private doGet(url:string):Observable<JSON> {
    return this.http.get(url).map(res=>res.json() as JSON);
  }

}
