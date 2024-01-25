import { Component } from '@angular/core';
import { ActivatedRoute, Params, } from '@angular/router';
import { User } from '../model/user.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  role: string | null = null;
  login:string|null=null;
  constructor(private route: ActivatedRoute) { }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.role = this.route.snapshot.queryParamMap.get('userRole');
    // console.log(this.login);
    
    // console.log(this.role);

  }
}
