import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { Menus } from "../common/menus";
import { User } from "../common/User";
import { AuthService } from "./auth-service.service";

@Injectable({
  providedIn: "root",
})
export class UpdateMenuService {
  baseUrl = environment.baseUrl;
  private updateUrl = this.baseUrl + "api/update/menu";
  message: string;
  menu = new BehaviorSubject<any>("");
  user: User;
  constructor(
    private httpClient: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {}

  weeklyMenuUpdate(menus: Menus[]): Observable<any> {
    console.log(JSON.stringify(menus));
    return this.httpClient.put<Menus[]>(this.updateUrl, menus);
  }

  updateDayMenu(menu: Menus) {
    console.log(JSON.stringify(menu));
    this.authService.loggedinUser.subscribe((data) => (this.user = data));

    const token = this.user.token;
    const header = new HttpHeaders().set("Authorization", token);
    this.httpClient
      .put<Menus>(this.updateUrl, menu, { headers: header })
      .subscribe((data) => {
        console.log(data);
      });
  }

  uploadImage(uploadImageData: FormData) {
    // Make a call to the Spring Boot Application to save the image
    this.httpClient
      .post("http://localhost:8080/image/upload", uploadImageData, {
        observe: "response",
      })
      .subscribe((response) => {
        if (response.status === 200) {
          this.message = "Image uploaded successfully";
        } else {
          this.message = "Image not uploaded successfully";
        }
      });
  }

  private handleError(error: any) {
    console.error("server error:", error);
    if (error.error instanceof Error) {
      const errMessage = error.error.message;
      return Observable.throw(errMessage);
      // Use the following instead if using lite-server
      // return Observable.throw(err.text() || 'backend server error');
    }
    return Observable.throw(error || "Node.js server error");
  }

  getMenubyId(url: string, headers: HttpHeaders, day: string) {
    // const token: string;

    // this.authService.user.subscribe((user) => (token = user.token));
    //  const headers = new HttpHeaders()
    //     .set("Content-Type", "application/json")
    //     .set("Authorization", sessionStorage.getItem("token"));
    this.httpClient.get<Menus>(url, { headers }).subscribe((data) => {
      console.log(data);
      this.menu.next(data);
      this.router.navigate(["updateMenu", day]);
    });
  }
}
