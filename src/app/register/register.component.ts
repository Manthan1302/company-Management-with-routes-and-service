import { Component, ElementRef, ViewChild } from '@angular/core';
import { User } from '../model/user.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import { UserService } from '../services/user.service';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  @ViewChild('name') name!: ElementRef;
  @ViewChild('email') email!: ElementRef;
  @ViewChild('password') pass!: ElementRef;
  @ViewChild('registerForm')fom!:NgForm;
  constructor(private router: Router, private userServices: UserService) { }

  RegisterData(name: string, email: string, pass: string) {
    console.log(this.fom);
    
    //not blank validation
    if (name === "" || email === "" || pass === "") {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Fill All Details!",
      });
      return
    }
    //only alphabets allowd validation
    if (!name.match("^[A-Za-z]+")) {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Enter Valid Name",
      });
      return
    }
    //email validation
    if (!email.match("[a-z0-9._%+\-]+@[a-z0-9.\-]+.[a-z]{3}$")) {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Enter Valid Email",
      });
      return
    }
    //name length more than 4 letter validation
    if (name.length < 4) {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Please Enter more than 4 letter ",
      });
      return
    }
    //password length more than 6 letter validation

    if (pass.length < 6) {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Please Enter more than 6 letter ",
      });
      return
    }
    
    Swal.fire({
      icon: "success",
      title: "Registration",
      text: " Congratulation!! Registration Successfully!",
    });
    this.userServices.register(name, email, pass);
    this.name.nativeElement.value = ""
    this.email.nativeElement.value = ""
    this.pass.nativeElement.value = ""
    this.router.navigate(['/'])
    // this.router.navigate(['/login',this.userData])
  }
}
