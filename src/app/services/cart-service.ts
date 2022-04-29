import { DomSanitizer } from '@angular/platform-browser';
import { BehaviorSubject, Subject } from 'rxjs';
import { Menus } from '../common/menus';
import { CartItem } from '../model/cart-item';

export class CartService {
  cartItems: CartItem[] = [];
  totalPrice: Subject<number> = new BehaviorSubject<number>(0);
  totalQuantity: Subject<number> = new BehaviorSubject<number>(0);
  cartItemTotal = 0;

  updateCart(m: Menus, sanitizer: DomSanitizer) {
    const item = new CartItem(m, sanitizer);

    if (this.cartItems.length === 0) {
      this.cartItems.push(item);
      this.cartItemTotal = this.cartItemTotal + m.price;
      this.totalPrice.next(this.cartItemTotal);
      this.totalQuantity.next(1);
    } else {
      for (const tempCartItem of this.cartItems) {
        if (m.day !== tempCartItem.day) {
          this.cartItems.push(item);
          // let total=tempCartItem.unitPrice +m.price;
          this.totalPrice.next(m.price);
          this.totalQuantity.next(1);
        } else {
          this.cartItemTotal = this.cartItemTotal + m.price;
          this.totalPrice.next(this.cartItemTotal);
          tempCartItem.quantity = tempCartItem.quantity + 1;
          this.totalQuantity.next(tempCartItem.quantity);
        }
      }
    }
  }
}
