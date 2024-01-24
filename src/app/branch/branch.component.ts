import { Component } from '@angular/core';
import { BranchService } from '../services/branch.service';
import { User } from '../model/user.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.css']
})
export class BranchComponent {
  branch: { id: number, name: string }[] = []

  role: string | null = null;

  updatePermission: boolean = false;
  deletePermission: boolean = false;
  constructor(private branchService: BranchService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.branch = this.branchService.Branch;
    console.log(this.branch);
    this.role = this.route.snapshot.queryParamMap.get('userRole');

    console.log(this.role);



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
