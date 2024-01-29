import { Component, ElementRef, ViewChild } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { User } from '../model/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent {

  name!: string;
  employee: { id: number, name: string }[] = []
  index: number | null = null;
  updatePermission: boolean = false;
  deletePermission: boolean = false;
  role: string | null = null;
  updateForm: boolean = false;
  user!: User;
  constructor(private employeeService: EmployeeService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.employee = this.employeeService.employee;
    let dataUser = sessionStorage.getItem('loggedInUser')
    this.user = JSON.parse(dataUser!);
    console.log(this.employee);

    // this.role = this.route.snapshot.queryParamMap.get('userRole');



    if (this.user.userRole === "superAdmin") {
      this.updatePermission = true;
      this.deletePermission = true;
    }
    if (this.user.userRole === "admin") {
      this.updatePermission = true;
      this.deletePermission = false;
    }
    if (this.user.userRole === "basicUser") {
      this.updatePermission = false;
      this.deletePermission = false;
    }
  }



  deleteEmployee(data: { id: number, name: string }) {
    this.employeeService.deleteEmployeeService(data);
  }

  editEmployee(data: { id: number, name: string }) {
    this.employeeService.editEmployeeService(data);
    this.router.navigate(['editEmployee'], { relativeTo: this.route, queryParams: { id: this.employeeService.index } })
  }
}
