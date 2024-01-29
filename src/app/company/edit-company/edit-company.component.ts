import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/user.model';
import { CompanyService } from 'src/app/services/compny.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-company',
  templateUrl: './edit-company.component.html',
  styleUrls: ['./edit-company.component.css']
})

export class EditCompanyComponent {
  name!: string;
  user!: User;
  index: number | null = null;
  constructor(private companyService: CompanyService, private route: ActivatedRoute, private router: Router) { }

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
    this.name = this.companyService.Company[this.index!].name
    console.log(this.name);
    // this.updateBranch(this.name)
  }
  updateCompany(name: string) {
    this.companyService.updateCompanyService(name);
  }
}
