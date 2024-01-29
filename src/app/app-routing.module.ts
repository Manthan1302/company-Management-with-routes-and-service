import { EditCompanyComponent } from './company/edit-company/edit-company.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmployeeComponent } from './employee/employee.component';
import { BranchComponent } from './branch/branch.component';
import { CompanyComponent } from './company/company.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuardService } from './services/authGuard.service';
import { loginAuthGuardService } from './services/loginAuthGuard.service';
import { EditBranchComponent } from './branch/edit-branch/edit-branch.component';
import { EditEmployeeComponent } from './employee/edit-employee/edit-employee.component';


const routes: Routes = [
  { path: '', component: LoginComponent, canActivate: [loginAuthGuardService], canDeactivate: [AuthGuardService] },
  { path: 'register', component: RegisterComponent, canActivate: [loginAuthGuardService] },
  {
    path: 'dashboard', component: DashboardComponent, children: [
      {
        path: 'employee', component: EmployeeComponent, children: [
          {
            path: 'editEmployee', component: EditEmployeeComponent
          }
        ]
      },
      {
        path: 'branch', component: BranchComponent, children: [
          { path: 'editBranch', component: EditBranchComponent }
        ]
      },
      {
        path: 'company', component: CompanyComponent, children: [
          { path: 'editCompany', component: EditCompanyComponent }
        ]
      },
    ],
    canActivate: [AuthGuardService]
  },
  { path: "**", component: PageNotFoundComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
