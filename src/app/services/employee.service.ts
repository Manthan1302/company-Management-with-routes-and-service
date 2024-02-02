import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import Swal from "sweetalert2";
import { Employee } from "../model/employee";

@Injectable()
export class EmployeeService {
    index: number | null = null;
    name!: string;
    constructor(private router:Router){}

    employee = [
        {
            id: 1,
            name: "manthan",
        },
        {
            id: 2,
            name: "jeel",
        },
        {
            id: 3,
            name: "arjun",
        },
        {
            id: 4,
            name: "mayur",
        },
        {
            id: 5,
            name: "ronak",
        },
        {
            id: 6,
            name: "dev",
        },
        {
            id: 7,
            name: "urvish",
        },
        {
            id: 8,
            name: "yuvraj",
        },
    ]

    deleteEmployeeService(data: Employee) {
        this.index = this.employee.findIndex(ele => {
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
                    this.employee.splice(this.index!, 1)
                }
            });
        }
    }

    editEmployeeService(data: Employee) {
        this.index = this.employee.findIndex(ele => {
            return ele.id === data.id && ele.name === ele.name
        })
        console.log(this.index);
        this.name = this.employee[this.index].name;
    }

    updateEmployeeService(name:string) {
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
                this.employee[this.index!].name = name
                this.router.navigate(["dashboard/employee"])

            }
        });
    }

    getEmployeeData():Observable<Employee[]>{
        let data = new Observable<Employee[]>(e=>{
            setTimeout(()=>{
                e.next(this.employee);
            },1000);
        });
        return data;
    }
}