import { Component, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Menus } from "src/app/common/menus";
import { UpdateMenuService } from "src/app/services/update-menu.service";

@Component({
  selector: "app-update-menu",
  templateUrl: "./update-menu.component.html",
  styleUrls: ["./update-menu.component.css"],
})
export class UpdateMenuComponent implements OnInit {
  day: string;
  selectedFile: File;
  weeklyMenuUpdateFormGroup: FormGroup;
  @Input() name: string;
  @Input() description: string;
  @Input() price: number;
  menu: Menus;

  constructor(
    private route: ActivatedRoute,
    private updateMenuService: UpdateMenuService
  ) {
    this.updateMenuService.menu.subscribe((data) => (this.menu = data));
  }

  ngOnInit(): void {
    this.day = this.route.snapshot.paramMap.get("day");
    if (this.menu != null) {
      this.weeklyMenuUpdateFormGroup = new FormGroup({
        id: new FormControl(null),
        description: new FormControl(this.menu.description),
        price: new FormControl(this.menu.price),
        name: new FormControl(this.menu.name),
        image: new FormControl(null),
      });
      console.log(this.menu + "menu");
    } else {
      this.weeklyMenuUpdateFormGroup = new FormGroup({
        id: new FormControl(null),
        description: new FormControl(null),
        price: new FormControl(null),
        name: new FormControl(null),
        image: new FormControl(null),
      });
      console.log(this.menu + "menu");
    }
  }

  public onFileChanged(event) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
    let id: number = this.getId(this.day);
    let description: string =
      this.weeklyMenuUpdateFormGroup.controls["description"].value;
    let price: number = this.weeklyMenuUpdateFormGroup.controls["price"].value;
    let name: string = this.weeklyMenuUpdateFormGroup.controls["name"].value;
    let image: File = this.selectedFile;
    let dayMenu: Menus = new Menus(this.day, name, description, price, id, "");
    this.updateMenuService.updateDayMenu(dayMenu);
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
}
