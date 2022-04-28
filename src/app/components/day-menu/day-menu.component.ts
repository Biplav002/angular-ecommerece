import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { Menus } from "src/app/common/menus";
import { PassServiceService } from "src/app/services/pass-service.service";
import { MenuDisplayService } from "src/app/services/menu-display.service";
import { DomSanitizer } from "@angular/platform-browser";
import { CartService } from "src/app/services/cart-service";

@Component({
  selector: "app-day-menu",
  templateUrl: "./day-menu.component.html",
  styleUrls: ["./day-menu.component.css"],
})
export class DayMenuComponent implements OnInit {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  dayMenu: Menus;
  retrieveResonse: any;
  base64Data: any;
  retrievedImage: any;
  constructor(
    private route: ActivatedRoute,
    private idPassService: PassServiceService,
    private menuDisplayService: MenuDisplayService,
    private sanitizer: DomSanitizer,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.idPassService.currentId.subscribe((msg) => (this.id = msg));
    this.idPassService.currentName.subscribe((msg) => (this.name = msg));

    this.menuDisplayService.getDayMenu(this.id).subscribe((data) => {
      this.name = data.name;
      this.description = data.description;
      this.price = data.price;
      this.image = data.img;
      this.id = data.id;
      this.dayMenu = new Menus(
        "",
        this.name,
        this.description,
        this.price,
        this.id,
        this.image
      );
      // data.forEach(value=>{

      //   let objectURL = 'data:image/png;base64,'+value.imagemodel.picByte;
      //   console.log(value.imagemodel.picByte);
      //   console.log(this);
      //   this.retrievedImage = this.sanitizer.bypassSecurityTrustResourceUrl(objectURL);

      // });

      console.log(this.dayMenu);
    });
  }

  onUploadImage() {}

  addToCart(m: Menus) {
    console.log(`Menu : ${m.description} `);
    this.cartService.updateCart(m, this.sanitizer);
  }
}
