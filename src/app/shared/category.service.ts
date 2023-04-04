import { Injectable } from '@angular/core';
import { Category } from './category.interface';
import * as uuid from 'uuid';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';

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
    category.$key = new Date().getTime().toString();
    return this.categorysRef.add({ ...category });
  }

  update(id: string, data: any): Promise<void> {
    return this.categorysRef.doc(id).update(data);
  }

  delete(id: string): Promise<void> {
    return this.categorysRef.doc(id).delete();
  }
}
