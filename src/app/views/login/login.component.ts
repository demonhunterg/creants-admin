import {Component} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { Router} from '@angular/router';
import {LoginService} from './login.service';
import {QantApiService} from '../../../qant_api/qant-api.service';
import { QAntObject } from '../../../qant_api/qant-object';
import { MessageHandlerService } from '../../message-handler.service';
import { CookieService } from 'angular2-cookie/services/cookies.service';
//https://www.npmjs.com/package/angular2-cookie
@Component({
  selector: 'login',
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
  providers: [LoginService, CookieService]
})
export class Login {
  public USER_INFO:string = "userInfo";
  public form:FormGroup;
  public username:AbstractControl;
  public password:AbstractControl;
  public submitted:boolean = false;
  public isChecked:boolean = false;

  constructor(fb:FormBuilder, private router:Router, private loginService:LoginService, private qantApiService:QantApiService, private messageHandlerService:MessageHandlerService, private _cookieService:CookieService) {

    this.isChecked = this._cookieService.get('remember') === 'true';
    if(this.isChecked){
      this.form = fb.group({
        'username': [this._cookieService.get('username'), Validators.compose([Validators.required, Validators.minLength(4)])],
        'password': [this._cookieService.get('password'), Validators.compose([Validators.required, Validators.minLength(4)])]
      });


    }else{
      this.form = fb.group({
        'username': ["", Validators.compose([Validators.required, Validators.minLength(4)])],
        'password': ["", Validators.compose([Validators.required, Validators.minLength(4)])],
        'remember':false
      });
    }

    this.username = this.form.controls['username'];
    this.password = this.form.controls['password'];


    messageHandlerService.getLoginListener().subscribe(message => this.handleMessage(message));
  }

  public onSubmit(values:Object):void {
    this.submitted = true;
    if (this.form.valid) {
      /*this.loginService.loginByCreants(values["username"], values["password"])
        .subscribe(data=> {
          if (data["code"] == 1) {
            this.qantApiService.login(data["token"]);
          }
        }, err => {
          console.log(err);
        });*/

      if(this.isChecked){
        this._cookieService.put('username',values["username"]);
        this._cookieService.put('password',values["password"]);
        this._cookieService.put('remember','true');
      }else{
        this._cookieService.remove('username');
        this._cookieService.remove('password');
        this._cookieService.remove('remember');
      }

      this.qantApiService.login(values["username"], values["password"],"--=={{{ AdminZone }}}==--");
    }
  }

  public handleMessage(message:QAntObject) {
    console.log("----------------" + message.toJson());
    console.log(message.toJson());
    if (message.getValue("un")) {
      localStorage.setItem(this.USER_INFO, JSON.stringify(message.toJson()));
      this.router.navigate(['/views']);
    }
  }

  private handleError(error:any):Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
