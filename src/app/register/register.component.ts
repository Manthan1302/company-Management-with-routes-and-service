import { Component, ElementRef, ViewChild } from '@angular/core';
import { User } from '../model/user.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  @ViewChild('name') name!: ElementRef;
  @ViewChild('email') email!: ElementRef;
  @ViewChild('password') pass!: ElementRef;
  constructor(private router: Router,private userServices:UserService) { }



  
  RegisterData(name: string, email: string, pass: string) {
    if (name === "" || email === "" || pass === "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
 
      });
      return
    }
    Swal.fire({
      icon: "success",
      title: "Registration",
      text: " Congratulation!! Registration Successfully!",
    });
    this.userServices.register(name,email,pass);
    this.name.nativeElement.value = ""
    this.email.nativeElement.value = ""
    this.pass.nativeElement.value = ""
    this.router.navigate(['/'])
    // this.router.navigate(['/login',this.userData])
  }
}
