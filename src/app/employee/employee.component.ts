import { Component } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { User } from '../model/user.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent {

  employee: { id: number, name: string }[] = []

  updatePermission: boolean = false;
  deletePermission: boolean = false;
  role: string | null = null;
  constructor(private employeeService: EmployeeService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.employee = this.employeeService.employee;
    console.log(this.employee);
    this.role = this.route.snapshot.queryParamMap.get('userRole');



    if (this.role === "superAdmin") {
      this.updatePermission = true;
      this.deletePermission = true;
    }
    if (this.role === "admin") {
      this.updatePermission = true;
      this.deletePermission = false;
    }
    if (this.role === "basicUser") {
      this.updatePermission = false;
      this.deletePermission = false;
    }
  }



}
