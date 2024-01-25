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


const routes: Routes = [
  { path: '', component: LoginComponent ,canActivate:[loginAuthGuardService], canDeactivate:[AuthGuardService]},
  { path: 'register', component: RegisterComponent ,canActivate:[loginAuthGuardService]},
  {
    path: 'dashboard', component: DashboardComponent, children: [
      { path: 'employee', component: EmployeeComponent },
      { path: 'branch', component: BranchComponent },
      { path: 'company', component: CompanyComponent },
    ],
    canActivate:[AuthGuardService]
  },
  { path: "**", component: PageNotFoundComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
