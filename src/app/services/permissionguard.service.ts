import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router, ResolveFn, Resolve } from "@angular/router";

import { User } from "../model/user.model";
import Swal from "sweetalert2";
import { Company } from "../model/company.model";
import { Observable } from "rxjs";
import { CompanyService } from "./compny.service";


@Injectable({
    providedIn: 'root'
})
export class PermissionGuardServices implements CanActivate, Resolve<Company[]> {
    constructor(private route: Router, private companyService: CompanyService) { }


    b!: User;
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean {
        let a = sessionStorage.getItem('loggedInUser')
        this.b = JSON.parse(a!)
        if (this.b.permission.includes(route.data['role'])) {
            return true
        }
        else {
            Swal.fire({
                icon: "warning",
                title: "Oops...",
                text: "Unauthorized Access ",
            });
            // this.route.navigate(['dashboard'])
            return false
        }
    }


    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Company[] | Observable<Company[]> | Promise<Company[]> {
        return this.companyService.getAllCompany();
        
    }

    
}