import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { HomeComponent } from './pages/home/home.component';
import { BankComponent } from './pages/bank/bank.component';
import { StudentListComponent } from './pages/student-list/student-list.component';
import { EmployeeListComponent } from './pages/employee-list/employee-list.component';
import { CategoryListComponent } from './pages/category-list/category-list.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'bank', component: BankComponent },
  { path: 'student-list', component: StudentListComponent },
  { path: 'employee-list', component: EmployeeListComponent },
  { path: 'category-list', component: CategoryListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
