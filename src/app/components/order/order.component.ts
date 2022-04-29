import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
declare var Razorpay: any;
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit {
  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  form: any = {};
  paymentId: string;
  error: string;
  Razorpay: any;
  firstName: string;
  lastName: string;
  email: string;
  totalPrice: string;
  options = {
    key: '',
    amount: '',
    name: 'Nourriture',
    description: 'Delicious & Nutritious',
    image: './assets/images/products/logo.png',
    order_id: '',
    handler(response) {
      const event = new CustomEvent('payment.success', {
        detail: response,
        bubbles: true,
        cancelable: true,
      });
      window.dispatchEvent(event);
    },
    prefill: {
      name: '',

      email: '',
      contact: '',
    },
    notes: {
      address: '',
    },
    theme: {
      color: '#3399cc',
    },
  };
  ngOnInit(): void {
    this.firstName = this.route.snapshot.paramMap.get('firstName');
    this.lastName = this.route.snapshot.paramMap.get('lastName');
    this.email = this.route.snapshot.paramMap.get('email');
    this.totalPrice = this.route.snapshot.paramMap.get('totalPrice');
    this.form.name = this.firstName + ' ' + this.lastName;
    this.form.email = this.email;
    this.form.amount = this.totalPrice;
  }

  onSubmit(): void {
    this.paymentId = '';
    this.error = '';
    this.orderService.createOrder(this.form).subscribe(
      (data) => {
        this.options.key = data.secretKey;
        this.options.order_id = data.razorpayOrderId;
        this.options.amount = data.applicationFee; // paise
        this.options.prefill.name = this.form.name;
        this.options.prefill.email = this.form.email;
        this.options.prefill.contact = this.form.phone;
        const rzp1 = new Razorpay(this.options);
        rzp1.open();

        rzp1.on('payment.failed', function(response) {
          // Todo - store this information in the server
          console.log(response.error.code);
          console.log(response.error.description);
          console.log(response.error.source);
          console.log(response.error.step);
          console.log(response.error.reason);
          console.log(response.error.metadata.order_id);
          console.log(response.error.metadata.payment_id);
          this.error = response.error.reason;
        });
      },
      (err) => {
        this.error = err.error.message;
      }
    );
  }
  @HostListener('window:payment.success', ['$event'])
  onPaymentSuccess(event): void {
    this.orderService.updateOrder(event.detail).subscribe(
      (data) => {
        this.paymentId = data.message;
        this.router.navigate([
          '/paymentSuccess',
          { paymentId: this.paymentId },
        ]);
      },
      (err) => {
        this.error = err.error.message;
      }
    );
  }
}
