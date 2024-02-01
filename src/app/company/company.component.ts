import { EditCompanyComponent } from './edit-company/edit-company.component';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { CompanyService } from '../services/compny.service';
import { User } from '../model/user.model';
import { ActivatedRoute, Router } from '@angular/router';
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
  // role: string | null = null;
  index: number | null = null;
  updateForm: boolean = false;
  user!: User;

  constructor(private companyService: CompanyService, private route: ActivatedRoute, private router: Router) { }


  ngOnInit(): void {

    // this.companyService.getAllCompany().subscribe(
    //   (data:any) => {
    //     this.company = data;
    //   }
    // );

   this.company = this.route.snapshot.data['company'];
    // console.log(this.company);
    // this.role = this.route.snapshot.queryParamMap.get('userRole');
    let dataUser = sessionStorage.getItem('loggedInUser')
    this.user = JSON.parse(dataUser!);


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


  deleteCompany(data: { id: number, name: string }) {
    this.companyService.deleteCompanyBranch(data);
  }


  editCompany(data: { id: number, name: string }) {
    this.companyService.editCompanyService(data);
    this.router.navigate([`editCompany`], { relativeTo: this.route, queryParams: { id: this.companyService.index } })

  }
}
