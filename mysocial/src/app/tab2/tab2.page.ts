import { Component } from '@angular/core';
import { Post } from '../models/Post';
import { DataService } from '../services/data.service';
import { SharedService } from '../service/shared.service';
import { Friend } from '../models/Friend';
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";



@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  providers: [ Camera ]
})
export class Tab2Page {

  model = new Post();
  myFriends : Friend[] = [];

  constructor(private data: DataService, private shared : SharedService, private camera : Camera) {
    this.data.getAllFriends().subscribe(list => {
      this.myFriends = []; //clear prev data
      // travel the list, filter only my friends
      for(var i=0; i < list.length; i++){
        if(list[i].belongsTo == "Rhenard"){
          this.myFriends.push(list[i]);
        }
      }
    })
  }

  // pass 0 to choose from gallery
  // pass 1 to take a new pic
  chooseImage(sourceType: number) {
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: sourceType
    };

    this.camera.getPicture(options).then(
      imageData => {
        let base64Image = "data:image/jpeg;base64," + imageData;
        // console.log(base64Image);
        this.model.imageUrl = base64Image;
      },
      err => {
        // Handle error
      }
    );
  }


  sendPost(){
    // validation
    if(!this.model.message && !this.model.imageUrl) return;

    this.model.createdOn = new Date();
    this.model.from = this.shared.userName;
    console.log("Saving Post", this.model)

    // save the obj
    this.data.savePost(this.model);

    // create new model (clear form)
    this.model = new Post();
  }

  


}
