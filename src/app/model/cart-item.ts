import { DomSanitizer } from '@angular/platform-browser';
import { Menus } from '../common/menus';

export class CartItem {
  day: string;
  id: number;
  name: string;
  imageUrl: string;
  unitPrice: number;
  retrievedImage: any;
  quantity: number;
  desc: string;

  constructor(product: Menus, private sanitizer: DomSanitizer) {
    this.id = this.getDayId(product.day);
    this.day = product.day;
    this.name = product.name;
    this.imageUrl = product.img;
    this.unitPrice = product.price;

    this.quantity = 1;
    // let objectURL = "data:image/png;base64," + product.imagemodel.picByte;

    // this.retrievedImage =
    //   this.sanitizer.bypassSecurityTrustResourceUrl(objectURL);

    this.desc = product.description;
  }
  getDayId(day: string): number {
    switch (day) {
      case 'Monday':
        return 1;
      case 'Tuesday':
        return 2;
      case 'Wednesday':
        return 3;
      case 'Thrusday':
        return 4;
      case 'Friday':
        return 5;
      case 'Saturday':
        return 6;
      case 'Sunday':
        return 7;

      default:
        return 0;
    }
  }
}
