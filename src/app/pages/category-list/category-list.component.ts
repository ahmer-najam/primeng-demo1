import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { Category } from 'src/app/shared/category.interface';
import { CategoryService } from 'src/app/shared/category.service';
import * as _ from 'lodash';
import { MessageService } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css'],
})
export class CategoryListComponent implements OnInit {
  categories: Category[] = [];
  modalVisible = false;
  selectedRow: Category;
  isLoading = false;

  constructor(
    private service: CategoryService,
    private messageService: MessageService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.service
      .getAll()
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({
            id: c.payload.doc.id,
            ...c.payload.doc.data(),
          }))
        )
      )
      .subscribe((data) => {
        console.log(data);
        this.categories = data;
        this.isLoading = false;
      });
  }

  showModal(row) {
    this.selectedRow = _.cloneDeep(row);
    this.modalVisible = true;
  }

  closeModal() {
    this.modalVisible = false;
  }

  receiveData(data: Category) {
    if (data.$key != undefined) {
      this.categories = this.categories.filter((item) => {
        return item.$key != data.$key;
      });

      this.categories = [data, ...this.categories];
    }

    debugger;
    let res;
    if (data['$key'] == undefined) {
      res = this.service.create(data);
    } else {
      this.service.update(data.id, data).then((response) => {
        res = response;
      });
    }

    this.toastr.success('Record Submitted', 'Database');
  }
}
