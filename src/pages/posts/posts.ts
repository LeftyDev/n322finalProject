import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';

/**
 * Generated class for the PostsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-posts',
  templateUrl: 'posts.html',
})
export class PostsPage {

  posts: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public dataService: DataProvider) {
    this.posts = this.dataService.postList;
  }

  ionViewDidLoad() {

  }

  likesClicked(post):void {
    this.dataService.updateLikes(post);
  }

  addPost():void {
    let prompt = this.alertCtrl.create({
      title: "Add Post",
      message: "Fill out the info below",
      inputs: [
        {
          name: 'postName',
          placeholder: 'Post Title'
        },
        {
          name: 'postImg',
          placeholder: 'Post Image (URL)'
        },
        {
          name: 'content',
          placeholder: 'Post Description'
        },
        {
          name: 'username',
          placeholder: 'Your Name'
        },
        {
          name: 'avatarImg',
          placeholder: 'Your Image (URL)'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Submit',
          handler: data => {
            data['likes'] = 0;

            let today = new Date();
            let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
            let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            let dateTime = date + ' ' + time;
            data['date'] = dateTime;

            this.dataService.addNewPost(data);
          }
        }
      ]
    });
    prompt.present();
  }

  deletePost(postId):void {
    this.dataService.deletePost(postId);
  }

  updatePost(post):void {
    let prompt = this.alertCtrl.create({
      title: "Edit Post Description",
      message: "Fill out the info below",
      inputs: [
        {
          name: 'content',
          value: post.content
        },
        {
          name: 'postName',
          value: post.postName
        },
        {
          name: 'postImg',
          value: post.postImg
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Submit',
          handler: data => {
            this.dataService.updatePost(post.id, data.content, data.postName, data.postImg);
          }
        }
      ]
    });
    prompt.present();
  }
}
