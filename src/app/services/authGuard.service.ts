import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router, CanDeactivate, UrlTree } from "@angular/router";
import { LoginComponent } from "../login/login.component";
import { Observable } from "rxjs";
import { User } from "../model/user.model";


@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
    constructor(private route: Router) { }

 
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
        boolean {
        if (sessionStorage.getItem("authKey") === 'true') {
            return true
        }
        else {
            this.route.navigate(['/'])
            return false
        }
    }


    canDeactivate(component: LoginComponent, currentRoute: ActivatedRouteSnapshot,
        currentState: RouterStateSnapshot, nextState: RouterStateSnapshot):
        boolean {
        return component.canExit();
    }



}