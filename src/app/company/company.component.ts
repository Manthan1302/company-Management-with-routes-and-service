import { Component, ElementRef, ViewChild } from '@angular/core';
import { CompanyService } from '../services/compny.service';
import { User } from '../model/user.model';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent {

  company: { id: number, name: string }[] = []
  name!: string;
  updatePermission: boolean = false;
  deletePermission: boolean = false;
  role: string | null = null;
  index: number | null = null;
  updateForm: boolean = false;


  constructor(private companyService: CompanyService, private route: ActivatedRoute) { }


  ngOnInit(): void {
    // Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    // Add 'implements OnInit' to the class.
    this.company = this.companyService.Company;
    // console.log(this.company);
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


  deleteCompany(data: { id: number, name: string }) {
    this.index = this.companyService.Company.findIndex(ele => {
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
          //delete 
          this.company.splice(this.index!, 1)

        }
      });

    }
  }


  editCompany(data: { id: number, name: string }) {
    this.updateForm = true
    this.index = this.companyService.Company.findIndex(ele => {
      return ele.id === data.id && ele.name === ele.name
    })
    console.log(this.index);
    this.name = this.company[this.index].name;
  }

  updateCompany(name: string) {
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

        this.company[this.index!].name = name
        this.name = "";
        this.updateForm = false;
      }
    });

  }
}
