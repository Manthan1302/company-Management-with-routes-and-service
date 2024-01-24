import { Component } from '@angular/core';
import { User } from '../model/user.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private route: Router) { }
  userData: User[] = []
  Login(name: string, pass: string) {

    let data = localStorage.getItem('Users')
    // console.log(typeof(data));

    if (data) {
      this.userData = JSON.parse(data);
      // console.log(typeof(this.userData));
    }

    let index = this.userData.findIndex(ele => ele.name === name && ele.password === pass)
    console.log(index);

    if (index == -1) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: " Enter Valid Details!",
      });
    }
    else {
      this.userData[index].isLoggedIn = true;

      localStorage.setItem("loggedInUser", JSON.stringify(this.userData[index]));
      this.route.navigate(['/dashboard'], { queryParams: { userRole: this.userData[index].userRole } });
    }
  }
}
