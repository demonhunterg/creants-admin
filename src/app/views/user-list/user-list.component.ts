import {Router, ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MessageHandlerService } from '../../message-handler.service';
import { QAntDataSerializer } from '../../../qant_api/qant-data-serializer';
import { QAntObject } from '../../../qant_api/qant-object';
import { GameHeroService } from './game-hero.service';
import { GameHero } from '../entities/GameHero';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  providers: [GameHeroService]
})
export class UserListComponent implements OnInit {
  private jsonData:any = {page: 0, maxPage: 0, gameHeroes: []};
  private curPage:number = 1;
  private maxPage:number = 0;

  constructor(private activatedRoute:ActivatedRoute, private gameHeroService:GameHeroService) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params:Params) => {
        let reqPage = params['page'];
        if (reqPage > this.maxPage || reqPage == 0)return;
        if (reqPage == null) {
          reqPage = 1;
        }

        this.requestPage(reqPage);
      }
    );
  }

  requestPage(page:number) {
    this.gameHeroService.getUserList(page).subscribe(response=> {
      this.jsonData = response;
      this.curPage = response["page"];
      this.maxPage = response["maxPage"];
      console.log(this.jsonData);
    }, err => {
      alert(err);
      console.log(err);
    });
  }

}
