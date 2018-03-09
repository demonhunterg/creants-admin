import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Routes } from '@angular/router';
import { Router} from '@angular/router';
import { Overlay } from 'angular2-modal';
import { Modal } from 'angular2-modal/plugins/bootstrap';

import { MessageHandlerService } from '../message-handler.service';
import { QAntObject } from '../../qant_api/qant-object';
import { BaMenuService } from '../theme';
import { VIEWS_MENU } from './views.menu';

@Component({
  selector: 'app-views',
  providers: [Modal, Overlay],
  template: `
    <ba-sidebar></ba-sidebar>
    <ba-page-top></ba-page-top>
    <div class="al-main">
      <div class="al-content">
        <ba-content-top></ba-content-top>
        <router-outlet></router-outlet>
        <!--<button (click)="onClick()">Alert</button>-->

      </div>
    </div>
    <footer class="al-footer clearfix">
      <div class="al-footer-right" translate>{{'general.created_with'}} <i class="ion-heart"></i></div>
      <div class="al-footer-main clearfix">
        <div class="al-copy">&copy; <a href="https://creants.net" translate>Creants</a> 2018</div>
        <ul class="al-share clearfix">
          <li><i class="socicon socicon-facebook"></i></li>
          <li><i class="socicon socicon-twitter"></i></li>
          <li><i class="socicon socicon-google"></i></li>
          <li><i class="socicon socicon-github"></i></li>
        </ul>
      </div>
    </footer>
    <ba-back-top position="200"></ba-back-top>
    `
})
export class ViewsComponent implements OnInit {
  constructor(private modal:Modal, private _menuService:BaMenuService, private router:Router, private messageHandlerService:MessageHandlerService) {
    messageHandlerService.getDisconnectListener().subscribe(message => this.handleMessage(message));
  }

  ngOnInit() {
    this._menuService.updateMenuByRoutes(<Routes>VIEWS_MENU);
  }

  public handleMessage(message:QAntObject) {
    console.log("************ DISCONNECT *********");
    if (confirm("Disconnect!")) {
      this.router.navigate(['/login']);
    }
  }

  onClick() {
    const dialogRef = this.modal.alert()
      .size('lg')
      .showClose(true)
      .title('A simple Alert style modal window')
      .body(`
            <h4>Alert is a classic (title/body/footer) 1 button modal window that
            does not block.</h4>
            <b>Configuration:</b>
            <ul>
                <li>Non blocking (click anywhere outside to dismiss)</li>
                <li>Size large</li>
                <li>Dismissed with default keyboard key (ESC)</li>
                <li>Close wth button click</li>
                <li>HTML content</li>
            </ul>`)
      .open();

  }

}
