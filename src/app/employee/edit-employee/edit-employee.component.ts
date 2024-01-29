import { EmployeeService } from './../../services/employee.service';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/user.model';
import { BranchService } from 'src/app/services/branch.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent {
  name!: string;
  user!: User;
  index: number | null = null;

  constructor(private employeeService: EmployeeService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    let dataUser = sessionStorage.getItem('loggedInUser')
    this.user = JSON.parse(dataUser!);
    this.route.queryParams.subscribe(
      (param) => {
        this.index = param['id']
      }
    )
    
  }

  ngDoCheck(): void {
    //Called every time that the input properties of a component or a directive are checked. Use it to extend change detection by performing a custom check.
    //Add 'implements DoCheck' to the class.
    this.name = this.employeeService.employee[this.index!].name
    console.log(this.name);
    // this.updateBranch(this.name)
  }
  
  updateEmployee(name: string) {
    this.employeeService.updateEmployeeService(name);
  }
}
