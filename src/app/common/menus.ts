import { FormGroupName } from "@angular/forms";

export class Menus {
  day: string;
  name: string;
  description: string;
  price: number;
  imagemodel: any;

  dateCreated: Date;
  id: number;
  img: string;

  constructor(
    day: string,
    name: string,
    description: string,
    price: number,
    id: number,
    img: string
  ) {
    this.day = day;
    this.name = name;
    this.description = description;
    this.price = price;
    this.img = img;
    this.id = id;
  }
}
