import { Router } from '@angular/router';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { BranchService } from '../services/branch.service';
import { User } from '../model/user.model';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.css']
})
export class BranchComponent {
  branch: { id: number, name: string }[] = []
  name!: string;

  // role: string | null = null;
  index: number | null = null;
  updatePermission: boolean = false;
  deletePermission: boolean = false;
  user!: User;
  constructor(private branchService: BranchService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.branch = this.branchService.Branch;
    console.log(this.branch);
    // this.role = this.route.snapshot.queryParamMap.get('userRole');
    let dataUser = sessionStorage.getItem('loggedInUser')
    this.user = JSON.parse(dataUser!);
    // console.log(this.role);



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


  deleteBranch(data: { id: number, name: string }) {
    this.branchService.deleBranchService(data);
  }
  

  editBranch(data: { id: number, name: string }) {
    this.branchService.editBranchService(data);
    this.router.navigate([`editBranch`], { relativeTo: this.route, queryParams: { id: this.branchService.index } })
  }

}

