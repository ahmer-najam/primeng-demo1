import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css'],
})
export class TopbarComponent implements OnInit {
  items: MenuItem[] = [];

  ngOnInit(): void {
    this.items = [
      {
        label: 'Masters',
        icon: 'pi pi-fw pi-folder-open',
        items: [
          {
            label: 'Home',
            icon: 'pi pi-fw pi-home',
            routerLink: ['/'],
          },
          {
            label: 'Bank',
            icon: 'pi pi-fw pi-wallet',
            routerLink: ['/bank'],
          },
          {
            label: 'Student',
            icon: 'pi pi-fw pi-users',
            routerLink: ['/student-list'],
          },
          {
            label: 'Employee',
            icon: 'pi pi-fw pi-users',
            routerLink: ['/employee-list'],
          },
        ],
      },
    ];
  }
}
