import { User } from "../model/user.model";

export class UserService {
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

    register(name: string, email: string, pass: string) {
        this.userData.push({ id: this.userData.length + 1, name: name, email: email, password: pass, userRole: "basicUser", isLoggedIn: false })
        console.log(this.userData);
        localStorage.setItem('Users', JSON.stringify(this.userData));

    }

    login(index: number) {
        this.userData[index].isLoggedIn = true;
        localStorage.setItem("loggedInUser", JSON.stringify(this.userData[index]));
        localStorage.setItem("authKey",JSON.stringify(this.userData[index].isLoggedIn));
    }
    logout() {
        localStorage.removeItem('loggedInUser');
        localStorage.removeItem('authKey');

    }


}