import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Student } from 'src/app/shared/student.interface';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css'],
})
export class StudentFormComponent {
  @Input() formData: Student;
  @Output() closeDialog = new EventEmitter<boolean>();
  @Output() submittedData = new EventEmitter<Student>();

  ngOnInit(): void {}

  onSubmit(form) {
    this.submittedData.emit(form.value);
  }

  onClose() {
    this.closeDialog.emit(false);
  }

  sendFormData() {
    this.submittedData.emit(this.formData);
  }
}
