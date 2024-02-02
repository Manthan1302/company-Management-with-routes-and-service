import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import Swal from 'sweetalert2'
import { User } from '../model/user.model';
import { CompanyService } from '../services/compny.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {



  @Input() role: string | null = null;
  employeeClose: boolean = false;
  companyClose: boolean = false;
  branchClose: boolean = false;
  adminPermission = ["branch", "employee"]
  superAdminPermission = ["employee", "company", "branch"];
  userPermission = ["company"];
  user!: User;
  data: { id: number | null, name: string } = {id:null , name:""};
  match: boolean = false;

  constructor(private route: Router, private userService: UserService, private companyService: CompanyService) { }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    let data = sessionStorage.getItem("loggedInUser")
    this.user = JSON.parse(data!);
    console.log(this.user.permission);
    console.log(this.userPermission);

    this.userPermission.forEach(e => {
      this.user.permission.forEach(e1 => {
        if (e === e1) {
          this.match = true
        }
      })
    })

    // console.log(this.user.permission == this.userPermission);

    if (this.match) {
      this.branchClose = true;
      this.employeeClose = true;
      console.log(this.branchClose);
    }

    this.companyService.companySetSubject.subscribe((data: { id: number, name: string }) => {
      this.data = data
    })
  }

  logout() {

    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Logout!",
          text: "Logout Successfully",
          icon: "success"
        });
        //logout 
        this.userService.logout()
        this.route.navigate(['/'])
      }
    });
  }
}
