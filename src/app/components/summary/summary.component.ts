import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Address } from 'src/app/common/address';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css'],
})
export class SummaryComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router) {}
  shippingAddress: string;
  firstName: string;
  lastName: string;
  email: string;
  totalPrice: string;
  ngOnInit(): void {
    this.shippingAddress = this.route.snapshot.paramMap.get('address');
    this.firstName = this.route.snapshot.paramMap.get('firstname');
    this.lastName = this.route.snapshot.paramMap.get('lastname');
    this.email = this.route.snapshot.paramMap.get('email');
    this.totalPrice = this.route.snapshot.paramMap.get('totalPrice');
    console.log(this.shippingAddress);
  }

  payment() {
    console.log('payment');
    this.router.navigate([
      '/order',
      {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        totalPrice: this.totalPrice,
      },
    ]);
  }
}
