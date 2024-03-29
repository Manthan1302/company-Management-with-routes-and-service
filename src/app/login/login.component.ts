import { UserService } from './../services/user.service';
import { Component, ViewChild } from '@angular/core';
import { User } from '../model/user.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  pass: string = '';
  name: string = '';
  isSubmitted: boolean = false;
  @ViewChild('LoginForm') form! : NgForm;
  constructor(private route: Router, private userService: UserService) { }
  userData: User[] = []

  Login(name: string, pass: string) {
    console.log(this.form);

    let data = localStorage.getItem('Users')
    // console.log(typeof(data));

    if (data) {
      this.userData = JSON.parse(data);
      // console.log(typeof(this.userData));
    }

    let index = this.userData.findIndex(ele => ele.name === name && ele.password === pass)
    console.log(index);
    if (name === "" || pass === "") {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: " Enter Valid Details!",
      });
    }
    if (index == -1) {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: " Enter Valid Details!",
      });
    }
    else {
      Swal.fire({
        icon: "success",
        title: "Login",
        text: " Congratulation!! Login Successfully!",
      });
      this.isSubmitted = true;
      this.userService.login(index);
      this.userData[index].isLoggedIn = true;
      this.route.navigate(['/dashboard']);
    }
    this.name = "";
    this.pass = "";
  }


  canExit() {
    if ((this.name || this.pass) && !this.isSubmitted) {
      return confirm('you have unsaved Changes. Do you want to navigate ?')
    }
    else {
      return true;
    }
  }


}
