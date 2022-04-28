import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-paymentsuccessful",
  templateUrl: "./paymentsuccessful.component.html",
  styleUrls: ["./paymentsuccessful.component.css"],
})
export class PaymentsuccessfulComponent implements OnInit {
  paymentId: string;
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.paymentId = this.route.snapshot.paramMap.get("paymentId");
  }
}
