import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { Student } from 'src/app/shared/student.interface';
import { StudentService } from 'src/app/shared/student.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css'],
})
export class StudentListComponent implements OnInit {
  students: Student[] = [];
  modalVisible = false;
  selectedRow: Student;
  isLoading = false;

  constructor(private service: StudentService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.service
      .getAll()
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({
            $key: c.payload.doc.id,
            ...c.payload.doc.data(),
          }))
        )
      )
      .subscribe((data) => {
        this.students = data;
        this.isLoading = false;
      });
  }

  showModal(row) {
    debugger;

    this.selectedRow = row;
    this.modalVisible = true;
  }

  closeModal() {
    this.modalVisible = false;
  }
  
  receiveData(data: Student) {
    debugger;
    if (data.$key != undefined) {
      this.students = this.students.filter((item) => {
        return item.$key != data.$key;
      });

      this.students = [data, ...this.students];
    }

    if (data['$key'] == undefined) {
      let res = this.service.create(data);
    } else {
      this.service.update(data.$key, data);
    }
  }


}
