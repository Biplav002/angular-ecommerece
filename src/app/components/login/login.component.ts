import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth-service.service";


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html', 
})
export class LoginComponent implements OnInit{
    loginForm: FormGroup;
    constructor(private authService: AuthService, private router: Router){ }
    submitted = false;
    errorMessage = '';
    isLoggedin = false;
    isLoginFailed = false;
    ngOnInit() {
        this.loginForm = new FormGroup({
            userName: new FormControl(null, Validators.required),
            password: new FormControl(null, Validators.required),
        });
    }
    onSubmit(){
        this.submitted = true;
        this.authService.login(this.loginForm.value.userName, this.loginForm.value.password).subscribe(
            data=>{
                this.isLoggedin = true
                sessionStorage.setItem("username", data.userName);
                let tokenStr = "Bearer " + data.token;
                console.log("Token---  " + tokenStr);
                      sessionStorage.setItem("token", tokenStr);
                if(data.roles=='ROLE_ADMIN'){
                      this.router.navigate(['/updateMenu']);
            }
            if(data.roles=='ROLE_USER'){
              this.router.navigate(['/menuDisplay']);
    }
            },
            error=>{
                console.log(error);
                this.errorMessage = error;
                this.isLoggedin = false;
                this.isLoginFailed = true;
            }
        );
    }
}