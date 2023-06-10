import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';
import * as firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private afs: AngularFirestore) {}

  loadFeatured() {
    return this.afs
      .collection('posts', (ref) =>
        ref.where('isFeatured', '==', true).limit(4)
      )
      .snapshotChanges()
      .pipe(
        map((actions: any) => {
          return actions.map((a: any) => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            const returnObj = { id, data };

            return returnObj;
          });
        })
      );
  }

  loadLatest() {
    return this.afs
      .collection('posts', (ref) => ref.orderBy('createdAt'))
      .snapshotChanges()
      .pipe(
        map((actions: any) => {
          return actions.map((a: any) => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            const returnObj = { id, data };

            return returnObj;
          });
        })
      );
  }

  loadCategoryPosts(categoryId: string) {
    return this.afs
      .collection('posts', (ref) =>
        ref.where('category.categoryId', '==', categoryId)
      )
      .snapshotChanges()
      .pipe(
        map((actions: any) => {
          return actions.map((a: any) => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            const returnObj = { id, data };

            return returnObj;
          });
        })
      );
  }

  loadPost(postid: string) {
    return this.afs.doc(`posts/${postid}`).valueChanges();
  }

  loadSimilar(catId: string) {
    return this.afs
      .collection('posts', (ref) =>
        ref.where('category.categoryId', '==', catId).limit(6)
      )
      .snapshotChanges()
      .pipe(
        map((actions: any) => {
          return actions.map((a: any) => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            const returnObj = { id, data };

            return returnObj;
          });
        })
      );
  }

  countViews(postId: string) {
    const viewsCount = {
      views: firebase.default.firestore.FieldValue.increment(1),
    };
    this.afs
      .doc(`posts/${postId}`)
      .update(viewsCount)
      .then(() => {
        console.log('Views Value Incremented');
      });
  }
}
