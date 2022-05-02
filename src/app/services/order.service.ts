import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { User } from "../common/User";
import { AuthService } from "./auth-service.service";

@Injectable({
  providedIn: "root",
})
export class OrderService {
  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };
  user: User;
  constructor(private http: HttpClient, private authService: AuthService) {}

  createOrder(order): Observable<any> {
    this.authService.loggedinUser.subscribe((data) => (this.user = data));
    const token = this.user.token;
    const header = new HttpHeaders().set("Authorization", token);
    header.set("Content-Type", "application/json");
    return this.http.post(
      environment.baseUrl + "api/order",
      {
        customerName: order.name,
        email: order.email,
        phoneNumber: order.phone,
        amount: order.amount,
      },
      { headers: header }
    );
  }

  updateOrder(order): Observable<any> {
    return this.http.put(
      environment.baseUrl + "api/order",
      {
        razorpayOrderId: order.razorpay_order_id,
        razorpayPaymentId: order.razorpay_payment_id,
        razorpaySignature: order.razorpay_signature,
      },
      this.httpOptions
    );
  }
}
