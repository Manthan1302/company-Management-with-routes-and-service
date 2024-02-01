import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Params, Router, } from '@angular/router';
import { User } from '../model/user.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  role: string | null = null;
  login:string|null=null;
  showLoader : boolean = false;
  constructor(private route: ActivatedRoute,private router:Router) { }
  
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.role = this.route.snapshot.queryParamMap.get('userRole');
    
    this.router.events.subscribe((routerEvent)=>{
      if(routerEvent instanceof NavigationStart){
        this.showLoader=true
      }
      if(routerEvent instanceof NavigationEnd){
        this.showLoader=false

      }
    })
  }
}
