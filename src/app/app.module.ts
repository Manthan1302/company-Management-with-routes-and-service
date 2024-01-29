import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { EmployeeComponent } from './employee/employee.component';
import { CompanyComponent } from './company/company.component';
import { BranchComponent } from './branch/branch.component';
import { EmployeeService } from './services/employee.service';
import { BranchService } from './services/branch.service';
import { CompanyService } from './services/compny.service';
import { FormsModule } from '@angular/forms';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UserService } from './services/user.service';
import { AuthGuardService } from './services/authGuard.service';
import { EditBranchComponent } from './branch/edit-branch/edit-branch.component';
import { EditEmployeeComponent } from './employee/edit-employee/edit-employee.component';
import { EditCompanyComponent } from './company/edit-company/edit-company.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    DashboardComponent,
    NavbarComponent,
    EmployeeComponent,
    CompanyComponent,
    BranchComponent,
    PageNotFoundComponent,
    EditBranchComponent,
    EditEmployeeComponent,
    EditCompanyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [EmployeeService, BranchService, CompanyService,UserService,AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
