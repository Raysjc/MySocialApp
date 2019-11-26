import { Component } from '@angular/core';
import { DataService } from '../services/data.service';
import { Post } from '../models/Post';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  postsToShow: Post[] = [];

  constructor(private data: DataService) {
    this.data.getAllPosts().subscribe(res =>{
      this.postsToShow = []; // clear previous data

      // filter to show messages ( to me, from me , to Everyone)
      for(var i=0; i < res.length; i++){
        var msg = res[i];
        if(msg.to == "Rhenard" || msg.from == "Rhenard" || msg.to == "Everyone"){
          this.postsToShow.push(msg);
        }
      }

      // this.postsToShow = res;
      // console.log("Event Happened!")
    });
  }
}
