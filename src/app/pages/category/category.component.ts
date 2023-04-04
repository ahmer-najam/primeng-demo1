import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Category } from 'src/app/shared/category.interface';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  @Input() formData: Category;
  @Output() closeDialog = new EventEmitter<boolean>();
  @Output() submittedData = new EventEmitter<Category>();

  constructor() {}
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
