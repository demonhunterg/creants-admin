import {Component} from '@angular/core';
import { Router} from '@angular/router';
import {GlobalState} from '../../../global.state';
import { QantApiService } from '../../../../qant_api/qant-api.service';
import { MessageHandlerService } from '../../../message-handler.service';
import { QAntObject } from '../../../../qant_api/qant-object';
@Component({
  selector: 'ba-page-top',
  templateUrl: './baPageTop.html',
  styleUrls: ['./baPageTop.scss']
})
export class BaPageTop {
  public user:{} = {};
  public isScrolled:boolean = false;
  public isMenuCollapsed:boolean = false;

  constructor(private _state:GlobalState, private router:Router, private messageHandlerService:MessageHandlerService, private qantApiService:QantApiService) {
    this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
      this.isMenuCollapsed = isCollapsed;
    });
    var obj = JSON.parse(localStorage.getItem("userInfo"))["p"];
    console.log("************************ AU SHIT ***************");
    this.user["avatar"] = "https://image.flaticon.com/icons/svg/145/145859.svg";
    this.user["full_name"] = obj["fn"];
    console.log(obj);
    messageHandlerService.getLogoutListener().subscribe(message => this.doLogout(message));
    messageHandlerService.getLoginListener().subscribe(message => this.doLogin(message));
  }

  public toggleMenu() {
    this.isMenuCollapsed = !this.isMenuCollapsed;
    this._state.notifyDataChanged('menu.isCollapsed', this.isMenuCollapsed);
    return false;
  }

  public logout() {
    console.log("---------- call logout ---------");
    this.qantApiService.logout();
  }

  public scrolledChanged(isScrolled) {
    this.isScrolled = isScrolled;
  }

  public doLogout(message) {
    this.router.navigate(['/login']);
  }
  public doLogin(message:QAntObject) {
    var outData:QAntObject = message.getValue("p");
    this.user["avatar"] = "avatar";
    this.user["full_name"] = outData.getValue("fn");
  }
}
