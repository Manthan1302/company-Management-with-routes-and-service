import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import Swal from "sweetalert2";
import { Company } from "../model/company.model";
@Injectable()
export class CompanyService {
    index: number | null = null;
    name!: string | null;
    Company: Company[] = [
        {
            id: 1,
            name: 'abc',
        },
        {
            id: 2,
            name: 'pqr',
        },
        {
            id: 3,
            name: 'xyz',
        },
        {
            id: 4,
            name: 'asd',
        },
        {
            id: 5,
            name: 'fgh',
        },
    ]
    constructor(private router: Router) { }


    editCompanyService(data: { id: number, name: string }) {

        this.index = this.Company.findIndex(ele => {
            return ele.id === data.id && ele.name === ele.name
        })
        console.log(this.index);
        this.name = this.Company[this.index].name;
    }

    updateCompanyService(name: string) {

        if (this.name === "") {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Enter Details!",
            });
            return
        }

        Swal.fire({
            title: "Are you sure?",
            text: "You Want  to update this!",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Update it!"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Updated!",
                    text: "Your Data has been Updated.",
                    icon: "success"
                });

                this.Company[this.index!].name = name
                this.router.navigate(["dashboard/company"])

            }
        });

    }

    deleteCompanyBranch(data: { id: number, name: string }) {
        this.index = this.Company.findIndex(ele => {
            return ele.id === data.id && ele.name === data.name
        })
        console.log(this.index);

        if (this.index > -1) {

            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });
                    //delete 
                    this.Company.splice(this.index!, 1)

                }
            });

        }

    }

    getAllCompany() {
        return new Observable<Company[]>((sub) => {
            setTimeout(() => {
                sub.next(this.Company)
            }, 1000)
        })
    }
}
