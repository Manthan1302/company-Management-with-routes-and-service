import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmployeeComponent } from './employee/employee.component';
import { BranchComponent } from './branch/branch.component';
import { CompanyComponent } from './company/company.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'dashboard', component: DashboardComponent, children: [
      { path: 'employee', component: EmployeeComponent },
      { path: 'branch', component: BranchComponent },
      { path: 'company', component: CompanyComponent },
    ]
  },
  { path: "**", component: PageNotFoundComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
