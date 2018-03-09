import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class LoginService {
  private appId:string = "4";
  private baseUrl:string = 'http://date.jsontest.com';
  private graphUrl:string = 'http://api.creants.net:9393';

  constructor(private http:Http) {
  }

  search(term:string):Observable<JSON> {
    return this.http.get(this.baseUrl).map(res=>res.json() as JSON);
  }

  loginFb(fbToken:string) {
    let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
    let options = new RequestOptions({headers: headers});
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('app_id', "1");
    urlSearchParams.append('fb_token', fbToken);
    let body = urlSearchParams.toString()

    this.http
      .post(this.graphUrl + '/oauth/fb', body, options)
      .map(res=>res.json() as JSON).subscribe(data=> {
        console.log(data);
      }, err => {
        console.log(err);
      });
  }

  public loginByCreants(userName:string, password:string) {
    let params = new URLSearchParams();
    params.append('app_id', this.appId);
    params.append('username', userName);
    params.append('password', password);
    return this.doPost(this.graphUrl + "/oauth/creants", params);
  }

  private doPost(url:string, params:URLSearchParams) {
    let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
    let options = new RequestOptions({headers: headers});
    let body = params.toString();

    return this.http.post(url, body, options).map(res=>res.json() as JSON);
  }


}
