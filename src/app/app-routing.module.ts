import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BankComponent } from './pages/bank/bank.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'bank', component: BankComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
