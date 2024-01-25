import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from "@angular/router";


@Injectable({
    providedIn: 'root'
})
export class loginAuthGuardService implements CanActivate {
    constructor(private route:Router ){}
    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    boolean {
        if (localStorage.getItem("authKey") === 'true') {
            this.route.navigate(['/dashboard'])
            return false
        }
        
            return true
    }



}