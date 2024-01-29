import { Component, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/user.model';
import { BranchService } from 'src/app/services/branch.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-branch',
  templateUrl: './edit-branch.component.html',
  styleUrls: ['./edit-branch.component.css']
})
export class EditBranchComponent {

  name!: string;
  index: number | null = null;
  user!: User;

  constructor(private branchService: BranchService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    // this.role = this.route.snapshot.queryParamMap.get('userRole');
    let dataUser = sessionStorage.getItem('loggedInUser')
    this.user = JSON.parse(dataUser!);
    // console.log(this.role);
    this.route.queryParams.subscribe(
      (param) => {
        this.index = param['id']
      }
    )

  }


  ngDoCheck(): void {
    //Called every time that the input properties of a component or a directive are checked. Use it to extend change detection by performing a custom check.
    //Add 'implements DoCheck' to the class.
    this.name = this.branchService.Branch[this.index!].name
    console.log(this.name);
    // this.updateBranch(this.name)
  }

  updateBranch(name: string) {
    console.log("call ", name);
    this.branchService.updateBranchService(name);

  }

}
