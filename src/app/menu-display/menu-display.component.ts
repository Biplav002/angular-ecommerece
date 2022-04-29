import { Component, OnInit } from "@angular/core";
import { Product } from "../common/product";
import { ProductService } from "../services/product.service";
import { MenuDisplayService } from "../services/menu-display.service";
import { Menus } from "../common/menus";
import { PassServiceService } from "../services/pass-service.service";
import { AuthService } from "../services/auth-service.service";
import { DispMenu } from "../common/dispMenu";

@Component({
  selector: "app-menu-display",
  templateUrl: "./menu-display.component.html",
  styleUrls: ["./menu-display.component.css"],
})
export class MenuDisplayComponent implements OnInit {
  m: Menus[];
  days: DispMenu;
  dayMenu: Menus;
  id: number;
  retrieveResonse: any;
  base64Data: any;
  retrievedImage: any;

  constructor(
    private menuDisplayService: MenuDisplayService,
    private idPassService: PassServiceService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // this.listMenu();
    this.days = new DispMenu();
  }
  listMenu() {
    this.menuDisplayService.getMenuList().subscribe((data) => {
      this.m = data;
      console.log(data);
    });
  }
  daySelected($event: any) {
    console.log($event.target.innerHTML);

    this.id = this.getId($event.target.innerHTML);
    this.idPassService.updateApprovalMessage(this.id, $event.target.innerHTML);
    // this.menuDisplayService.getDayMenuImage($event.target.innerHTML);
  }

  getId(day: string): number {
    switch (day) {
      case "Monday": {
        return 1;
        break;
      }
      case "Tuesday": {
        return 2;
        break;
      }
      case "Wednesday": {
        return 3;
        break;
      }
      case "Thrusday": {
        return 4;
        break;
      }
      case "Friday": {
        return 5;
        break;
      }
      case "Saturday": {
        return 6;
        break;
      }
      case "Sunday": {
        return 7;
        break;
      }
      default: {
        return 0;
        break;
      }
    }
  }
  handleLogout() {
    this.authService.logout();
  }
}
