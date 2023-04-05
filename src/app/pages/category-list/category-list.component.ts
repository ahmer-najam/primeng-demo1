import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { Category } from 'src/app/shared/category.interface';
import { CategoryService } from 'src/app/shared/category.service';
import * as _ from 'lodash';
import { MessageService } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2/dist/sweetalert2.js';

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

  toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    animation: true,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
  });
  constructor(
    private service: CategoryService,
    private messageService: MessageService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.isLoading = true;
    this.service
      .getAll()
      .valueChanges()
      .subscribe((list) => {
        this.categories = list;
        this.isLoading = false;
      });
    // this.service
    //   .getAll()
    //   .valueChanges()
    //   .pipe(
    //     map((changes) =>
    //       changes.map((c) => ({
    //         id: c.payload.doc.id,
    //         ...c.payload.doc.data(),
    //       }))
    //     )
    //   )
    //   .subscribe((data) => {
    //     this.categories = data;
    //     this.isLoading = false;
    //   });
  }

  showModal(row) {
    this.selectedRow = _.cloneDeep(row);
    this.modalVisible = true;
  }

  closeModal() {
    this.modalVisible = false;
  }

  receiveData(data: Category) {
    if (this.isCategoryExists(data)) return;

    if (data.$key != undefined) {
      this.categories = this.categories.filter((item) => {
        return item.$key != data.$key;
      });

      this.categories = [data, ...this.categories];
    }

    let res;
    if (data['$key'] == undefined) {
      res = this.service.create(data);
      res.then((i) => {
        data.id = i['id'];
        this.service.update(data.id, data);
      });
    } else {
      res = this.service.update(data.id, data);
    }

    this.toast.fire({
      icon: 'success',
      title: 'Record submitted',
    });
  }

  isCategoryExists(data): boolean {
    let record = this.categories.find((item) => {
      return (
        item.id != data.id &&
        item.category.toLowerCase() == data.category.toLowerCase()
      );
    });

    if (record) {
      this.toast.fire({
        icon: 'error',
        title: 'Duplicate Record',
      });
      return true;
    } else {
      return false;
    }
  }

  erroalert(message) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: message,
    });
  }
}
