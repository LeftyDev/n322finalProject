import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "angularfire2/firestore";
import {Observable} from "rxjs/Observable";

/*
  Generated class for the DataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

export interface Post {
  id?: string;
  avatarImg: string;
  postImg: string;
  postName: string;
  content: string;
  likes: number;
  username: string;
  date: string;
}

@Injectable()
export class DataProvider {

  postsListRef: AngularFirestoreCollection<Post>;
  postList: Observable<Post[]>;

  constructor(private afs: AngularFirestore) {
    this.postsListRef = this.afs.collection<Post>('Posts');
    // this.cardList = this.cardsListRef.valueChanges();
    this.postList = this.postsListRef.snapshotChanges().map(actions => {
      return actions.map(action => {
        const data = action.payload.doc.data() as Post;
        const id = action.payload.doc.id;
        return {id, ...data};
      });
    });
  }

  updateLikes(post): void {
    if (post) {
      this.postsListRef.doc(post.id).update({"likes": +1});
    }
  }

  addNewPost(postInfo): void {
    if (postInfo) {
      this.postsListRef.add(postInfo);
    }
  }

  deletePost(postId):void {
    this.postsListRef.doc(postId).delete();
  }

  updatePost(postId, newInfo, newPostName, newPostImg):void {
    if (postId && newInfo) {
      this.postsListRef.doc(postId).update({"content": newInfo, "postName": newPostName, "postImg": newPostImg});
    }
  }
}
