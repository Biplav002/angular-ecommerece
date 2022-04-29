import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { Country } from "src/app/common/Country";
import { Order } from "src/app/common/Order";
import { OrderItem } from "src/app/common/OrderItem";
import { Purchase } from "src/app/common/purchase";
import { State } from "src/app/common/State";
import { CartService } from "src/app/services/cart-service";
import { CheckoutService } from "src/app/services/checkout.service";

@Component({
  selector: "app-checkout",
  templateUrl: "./checkout.component.html",
  styleUrls: ["./checkout.component.css"],
})
export class CheckoutComponent implements OnInit {
  totalPrice = 0;
  totalQuantity = 0;

  cartDetailForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private cartService: CartService,
    private checkoutService: CheckoutService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cartService.totalPrice.subscribe((data) => (this.totalPrice = data));
    this.cartService.totalQuantity.subscribe(
      (data) => (this.totalQuantity = data)
    );
    this.cartDetailForm = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: [""],
        lastName: [""],
        email: [""],
      }),
      shippingAddress: this.formBuilder.group({
        street: [""],
        city: [""],
        state: [""],
        country: [""],
        zipCode: [""],
      }),

      billingAddress: this.formBuilder.group({
        street: [""],
        city: [""],
        state: [""],
        country: [""],
        zipCode: [""],
      }),

      creditCard: this.formBuilder.group({
        cardType: [""],
        nameOnCard: [""],
        cardNumber: [""],
        securityCode: [""],
        expirationMonth: [""],
        expirationYear: [""],
      }),
    });
  }

  copyShippingAddressToBillingAddress() {}

  onSubmit() {
    console.log(this.cartDetailForm.get("customer").value);
    console.log(
      "The email address is " + this.cartDetailForm.get("customer").value.email
    );

    console.log(
      "The shipping address country is " +
        this.cartDetailForm.get("shippingAddress").value.city
    );
    console.log(
      "The shipping address state is " +
        this.cartDetailForm.get("shippingAddress").value.state
    );

    // set up order
    const order = new Order();
    order.totalPrice = this.totalPrice;
    order.totalQuantity = this.totalQuantity;

    // get cart items
    const cartItems = this.cartService.cartItems;

    const orderItems: OrderItem[] = cartItems.map(
      (cartItem) => new OrderItem(cartItem)
    );

    // set up purchase
    const purchase = new Purchase();
    purchase.customer = this.cartDetailForm.get("customer").value;
    console.log(purchase.customer);
    purchase.shippingAddress =
      this.cartDetailForm.controls.shippingAddress.value;
    console.log(purchase.shippingAddress);
    const shippingState: State = JSON.parse(
      JSON.stringify(purchase.shippingAddress.state)
    );
    const shippingCountry: Country = JSON.parse(
      JSON.stringify(purchase.shippingAddress.country)
    );

    purchase.shippingAddress.state = shippingState.name;
    purchase.shippingAddress.country = shippingCountry.name;

    // populate purchase - billing address
    purchase.billingAddress = this.cartDetailForm.controls.billingAddress.value;

    const billingState: State = JSON.parse(
      JSON.stringify(purchase.billingAddress.state)
    );
    const billingCountry: Country = JSON.parse(
      JSON.stringify(purchase.billingAddress.country)
    );
    purchase.billingAddress.state = billingState.name;
    purchase.billingAddress.country = billingCountry.name;

    // populate purchase - order and orderItems
    purchase.order = order;
    purchase.orderItems = orderItems;

    this.checkoutService.placeOrder(purchase).subscribe({
      next: (response) => {
        alert(
          `Your order has been received.\nOrder tracking number: ${response.orderTrackingNumber}`
        );
        this.router.navigate([
          "/summary",
          {
            address: response.shippingAddress.street,
            firstname: response.customer.firstName,
            lastname: response.customer.lastName,
            email: response.customer.email,
            totalPrice: this.totalPrice,
          },
        ]);
        // reset cart
        // this.resetCart();
      },
      error: (err) => {
        alert(`There was an error: ${err.message}`);
      },
    });
  }

  resetCart() {
    // reset cart data
    this.cartService.cartItems = [];
    this.cartService.totalPrice.next(0);
    this.cartService.totalQuantity.next(0);

    // reset the form
    this.cartDetailForm.reset();

    // navigate back to the products page
    this.router.navigateByUrl("/cart-details");
  }
}
