import { Injectable } from "@angular/core";
import { RouteReuseStrategy, Router } from "@angular/router";
import Swal from "sweetalert2";

@Injectable()
export class BranchService {
    updateForm: boolean = false;
    index: number | null = null;
    name!: string;

    constructor(private router:Router){}
    Branch = [
        {
            id: 1,
            name: 'Ahmedabad',
        },
        {
            id: 2,
            name: 'Surat',
        },
        {
            id: 3,
            name: 'Rajkot',
        },
        {
            id: 4,
            name: 'Bhavnagar',
        },
        {
            id: 5,
            name: 'vadodara',
        },
    ]


    //edit Services
    editBranchService(data: { id: number, name: string }) {
        // this.updateForm = true
        this.index = this.Branch.findIndex(ele => {
            return ele.id === data.id && ele.name === ele.name
        })
        console.log(this.index);
        this.name = this.Branch[this.index].name;
        console.log(this.name);
    }


    //updateService
    updateBranchService(name: string) {
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

                this.Branch[this.index!].name = name
                this.router.navigate(["dashboard/branch"])
            }
        });

    }

    //delete Services
    deleBranchService(data: { id: number, name: string }) {
        this.index = this.Branch.findIndex(ele => {
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
                    this.Branch.splice(this.index!, 1)
                }
            });
        }
    }
}


