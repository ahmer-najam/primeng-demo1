import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.css'],
})
export class BankComponent implements OnInit {
  products = [];
  modalVisible = false;
  selectedRow;

  ngOnInit(): void {
    this.products = [
      { code: 'PRD-001', name: 'Nike', category: 'shoe', quantity: 10 },
      { code: 'PRD-002', name: 'Puma', category: 'shoe', quantity: 10 },
      { code: 'PRD-003', name: 'Hush Puppies', category: 'shoe', quantity: 10 },
      { code: 'PRD-004', name: 'Bata', category: 'shoe', quantity: 10 },
    ];
  }

  showModal(row) {
    this.selectedRow = row;
    this.modalVisible = true;
  }

  receiveData(data) {
    this.products = this.products.filter((item) => {
      return item.code != data.code;
    });

    this.products = [data, ...this.products];
  }

  closeModal() {
    this.modalVisible = false;
  }
}
