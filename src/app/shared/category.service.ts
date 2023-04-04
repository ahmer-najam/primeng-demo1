import { Injectable } from '@angular/core';
import { Category } from './category.interface';
import * as uuid from 'uuid';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private dbPath = '/category-list';
  categorysRef: AngularFirestoreCollection<Category>;

  constructor(private db: AngularFirestore) {
    this.categorysRef = db.collection(this.dbPath);
  }

  getAll(): AngularFirestoreCollection<Category> {
    return this.categorysRef;
  }

  // Fetch Single Category Object
  GetCategory(id: string) {
    return this.categorysRef.doc(id).get();
  }

  create(category: Category): any {
    category.id = '';
    category.$key = new Date().getTime().toString();
    return this.categorysRef.add({ ...category });
  }

  update(id: string, value: any) {
    // let doc = this.db.collection('options', (ref) =>
    //   ref.where('$key', '==', $key)
    // );
    // doc
    //   .snapshotChanges()
    //   .pipe(
    //     map((actions) =>
    //       actions.map((a) => {
    //         const data = a.payload.doc.data();
    //         const id = a.payload.doc.id;
    //         return { id, data };
    //       })
    //     )
    //   )
    //   .subscribe((_doc: any) => {
    //     let id = _doc[0].payload.doc.id; //first result of query [0]
    //     this.db.doc(`category-list/${id}`).update({ category: value });
    //   });

    // this.db.collection('category-list').
    // this.db.collection('category-list').doc($key).update({
    //   category: data.category,
    // });
    debugger;
    return this.categorysRef.doc(id).update(value);
  }

  delete(id: string): Promise<void> {
    return this.categorysRef.doc(id).delete();
  }
}
