import { User } from "../model/user.model";

export class UserService {
    userData: User[] = [
        {
            id: 1,
            name: "admin",
            email: "admin@gmal.com",
            password: "1234",
            userRole: "admin",
            isLoggedIn: false,
            permission: ["branch","employee"]

        },
        {
            id: 2,
            name: "super Admin",
            email: "superadmin@gmal.com",
            password: "1234",
            userRole: "superAdmin",
            isLoggedIn: false,
            permission:["employee","company","branch"]
        },
    ]

    register(name: string, email: string, pass: string) {
        this.userData.push({ id: this.userData.length + 1, name: name, email: email, password: pass, userRole: "basicUser", isLoggedIn: false ,permission:["company"]})
        console.log(this.userData);
        localStorage.setItem('Users', JSON.stringify(this.userData));

    }

    login(index: number) {
        this.userData[index].isLoggedIn = true;
        sessionStorage.setItem("loggedInUser", JSON.stringify(this.userData[index]));
        sessionStorage.setItem("authKey", JSON.stringify(this.userData[index].isLoggedIn));
    }
    logout() {
        sessionStorage.removeItem('loggedInUser');
        sessionStorage.removeItem('authKey');

    }


}