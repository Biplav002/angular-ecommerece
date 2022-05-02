import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Purchase } from "../common/purchase";
import { User } from "../common/User";
import { AuthService } from "./auth-service.service";

@Injectable({
  providedIn: "root",
})
export class CheckoutService {
  constructor(private http: HttpClient, private authService: AuthService) {}
  user: User;
  private purchaseUrl = environment.baseUrl + "api/checkout/purchase";
  placeOrder(purchase: Purchase): Observable<any> {
    console.log(purchase);
    this.authService.loggedinUser.subscribe((data) => (this.user = data));

    const token = this.user.token;
    const header = new HttpHeaders().set("Authorization", token);
    return this.http.post<Purchase>(this.purchaseUrl, purchase, {
      headers: header,
    });
  }
}
