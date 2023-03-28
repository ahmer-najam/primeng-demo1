import { Injectable } from '@angular/core';
import { Student } from './student.interface';
import * as uuid from 'uuid';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private dbPath = '/student-list';
  studentsRef: AngularFirestoreCollection<Student>;

  constructor(private db: AngularFirestore) {
    this.studentsRef = db.collection(this.dbPath);
  }

  getAll(): AngularFirestoreCollection<Student> {
    return this.studentsRef;
  }

  // Fetch Single Student Object
  GetStudent(id: string) {
    return this.studentsRef.doc(id).get();
  }

  create(student: Student): any {
    student.$key = new Date().getTime().toString();
    return this.studentsRef.add({ ...student });
  }

  update(id: string, data: any): Promise<void> {
    return this.studentsRef.doc(id).update(data);
  }

  delete(id: string): Promise<void> {
    return this.studentsRef.doc(id).delete();
  }
}
