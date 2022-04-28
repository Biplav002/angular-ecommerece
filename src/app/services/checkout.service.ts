import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Purchase } from "../common/purchase";
import { User } from "../common/User";
import { AuthService } from "./auth-service.service";

@Injectable({
  providedIn: "root",
})
export class CheckoutService {
  constructor(private http: HttpClient, private authService: AuthService) {}
  user: User;
  private purchaseUrl = "http://localhost:8080/api/checkout/purchase";
  placeOrder(purchase: Purchase): Observable<any> {
    console.log(purchase);
    this.authService.loggedinUser.subscribe((data) => (this.user = data));

    let token = this.user.token;
    let header = new HttpHeaders().set("Authorization", token);
    return this.http.post<Purchase>(this.purchaseUrl, purchase, {
      headers: header,
    });
  }
}
