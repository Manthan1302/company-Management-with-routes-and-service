import { Component } from '@angular/core';
import { CompanyService } from '../services/compny.service';
import { User } from '../model/user.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent {

  company: { id: number, name: string }[] = []

  updatePermission: boolean = false;
  deletePermission: boolean = false;
  role: string | null = null;
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
}
