import { Component, ElementRef, ViewChild } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { User } from '../model/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2'
import { Employee } from '../model/employee';
import { filter } from 'rxjs';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent {

  name!: string;
  employee: Employee[] = []
  index: number | null = null;
  updatePermission: boolean = false;
  deletePermission: boolean = false;
  role: string | null = null;
  updateForm: boolean = false;
  user!: User;

  constructor(private employeeService: EmployeeService, private route: ActivatedRoute, private router: Router) { }
  
  ngOnInit(): void {
    this.getEmployee()
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    // this.employee = this.employeeService.employee;
    let dataUser = sessionStorage.getItem('loggedInUser')
    this.user = JSON.parse(dataUser!);
    console.log(this.employee);

    // this.role = this.route.snapshot.queryParamMap.get('userRole');
    // this.route.data.subscribe(
    //   (d)=>{
    //     this.role=d['role']
    //   }
    // )
    //   console.log(this.role);


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



  deleteEmployee(data: Employee) {
    this.employeeService.deleteEmployeeService(data);
  }

  editEmployee(data: Employee) {
    this.employeeService.editEmployeeService(data);
    this.router.navigate(['editEmployee'], { relativeTo: this.route, queryParams: { id: this.employeeService.index } })
  }



  getEmployee(){
    this.employeeService.getEmployeeData().pipe(filter((val,i)=>{

      console.log(val);
      console.log(i+1);
      
      
      console.log(val[i].id);
      
      return val[i].id! == 1
      
    })).subscribe(res=>{
      this.employee=res;
      console.log(this.employee);
      
    })
  }
}
