import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart-service';

@Component({
  selector: 'app-cart-status',
  templateUrl: './cart-status.component.html',
  styleUrls: ['./cart-status.component.css']
})
export class CartStatusComponent implements OnInit {


 quantity: number;
 price: number;
  constructor(private cartService: CartService) { }

  ngOnInit(): void {
  this.onCartUpdate();
  }
  onCartUpdate() {

this.cartService.totalQuantity.subscribe(data => {
  this.quantity = data;

});
this.cartService.totalPrice.subscribe(data => {
  this.price = data;

});

}
}
