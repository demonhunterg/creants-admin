import { Component, OnInit } from '@angular/core';
import {NewFeedService} from './new-feed.service';
@Component({
  selector: 'app-new-feed',
  templateUrl: './new-feed.component.html',
  styleUrls: ['./new-feed.component.scss'],
  providers: [NewFeedService]
})
export class NewFeedComponent implements OnInit {

  constructor(private newFeedService:NewFeedService) {
  }

  ngOnInit() {
  }

  public postArticle(title:string, content:string, tag:string) {
    console.log(title + "/" + content + "/" + tag);
    this.newFeedService.postNewFeed(title, content, tag).subscribe(data=> {
      console.log(data);
    }, err => {
      console.log(err);
    });
  }

}
