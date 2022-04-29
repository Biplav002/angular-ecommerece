import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/common/User';
import { AuthService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private authService: AuthService, private router: Router) {}
  submitted = false;
  errorMessage = '';
  isLoggedin = false;
  isLoginFailed = false;
  loggedinUser: User;
  ngOnInit() {
    this.loginForm = new FormGroup({
      userName: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    });
    // this.loggedinUser;
  }
  onSubmit() {
    this.submitted = true;
    this.authService
      .login(this.loginForm.value.userName, this.loginForm.value.password)
      .subscribe(
        (data) => {
          this.isLoggedin = true;
          sessionStorage.setItem('username', data.userName);
          const tokenStr = 'Bearer ' + data.token;
          console.log('Token---  ' + tokenStr);
          sessionStorage.setItem('token', tokenStr);
          const loggedinUser: User = new User(
            data.userName,
            data.email,
            data.password,
            data.role,
            data.token
          );
          if (data.role === 'ROLE_ADMIN') {
            this.router.navigate(['/updateMenu']);
          }
          if (data.role === 'ROLE_USER') {
            this.router.navigate(['/menuDisplay']);
          }
        },
        (error) => {
          console.log(error);
          this.errorMessage = error;
          this.isLoggedin = false;
          this.isLoginFailed = true;
        }
      );
  }
}
