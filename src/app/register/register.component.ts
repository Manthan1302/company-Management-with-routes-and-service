import { Component, ElementRef, ViewChild } from '@angular/core';
import { User } from '../model/user.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  @ViewChild('name') name!: ElementRef;
  @ViewChild('email') email!: ElementRef;
  @ViewChild('password') pass!: ElementRef;
  constructor(private router: Router) { }

  userData: User[] = [
    {
      id: 1,
      name: "admin",
      email: "admin@gmal.com",
      password: "1234",
      userRole: "admin",
      isLoggedIn: false
    },
    {
      id: 2,
      name: "super Admin",
      email: "superadmin@gmal.com",
      password: "1234",
      userRole: "superAdmin",
      isLoggedIn: false

    },

  ]
  RegisterData(name: string, email: string, pass: string) {
    if (name === "" || email === "" || pass === "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        footer: '<a href="#">Why do I have this issue?</a>'
      });
      return
    }
    this.userData.push({ id: this.userData.length + 1, name: name, email: email, password: pass, userRole: "basicUser", isLoggedIn: false })
    console.log(this.userData);
    localStorage.setItem('Users', JSON.stringify(this.userData));
    this.name.nativeElement.value = ""
    this.email.nativeElement.value = ""
    this.pass.nativeElement.value = ""
    // this.router.navigate(['/login',this.userData])
  }
}
