import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-bank-form',
  templateUrl: './bank-form.component.html',
  styleUrls: ['./bank-form.component.css'],
})
export class BankFormComponent implements OnInit {
  @Input() formData;
  @Output() closeDialog = new EventEmitter<boolean>();
  @Output() submittedData = new EventEmitter<any>();

  ngOnInit(): void {
    console.log(this.formData);
  }

  onSubmit(form) {
    this.submittedData.emit(form.value);
    // console.log(form.value);
  }

  onClose() {
    this.closeDialog.emit(false);
  }

  sendFormData() {
    this.submittedData.emit(this.formData);
  }
}
