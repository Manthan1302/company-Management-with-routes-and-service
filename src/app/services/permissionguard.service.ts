import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from "@angular/router";

import { User } from "../model/user.model";
import Swal from "sweetalert2";


@Injectable({
    providedIn: 'root'
})
export class PermissionGuardServices implements CanActivate {
    constructor(private route: Router) { }

    b!: User;
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
        boolean {
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
            this.route.navigate(['dashboard'])
            return false
        }
    }
}