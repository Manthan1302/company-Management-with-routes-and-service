import { Component, ElementRef, ViewChild } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { User } from '../model/user.model';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent {

  name!:string ;
  employee: { id: number, name: string }[] = []
  index: number | null = null;
  updatePermission: boolean = false;
  deletePermission: boolean = false;
  role: string | null = null;
  updateForm:boolean=false;
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



  deleteEmployee(data: { id: number, name: string }) {
    this.index = this.employeeService.employee.findIndex(ele => {
      return ele.id === data.id && ele.name === data.name
    })
    console.log(this.index);

    if (this.index > -1) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
          this.employee.splice(this.index!, 1)
        }
      });
    }
  }

  editEmployee(data: { id: number, name: string }) {
    this.updateForm=true;
    this.index = this.employeeService.employee.findIndex(ele => {
      return ele.id === data.id && ele.name === ele.name
    })
    console.log(this.index);
    this.name = this.employee[this.index].name;
  }

  updateEmployee(name: string) {

    if (this.name === "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Enter Details!",
      });
      return
    }

    Swal.fire({
      title: "Are you sure?",
      text: "You Want  to update this!",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Update it!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Updated!",
          text: "Your Data has been Updated.",
          icon: "success"
        });
        this.employee[this.index!].name = name
        this.name = "";
        this.updateForm = false;
      }
    });

  }
}
