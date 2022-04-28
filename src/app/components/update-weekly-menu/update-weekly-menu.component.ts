import { HttpHeaders } from "@angular/common/http";
import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { Day } from "src/app/common/day";
import { Menus } from "src/app/common/menus";
import { User } from "src/app/common/User";
import { AuthService } from "src/app/services/auth-service.service";
import { UpdateMenuService } from "src/app/services/update-menu.service";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-update-weekly-menu",
  templateUrl: "./update-weekly-menu.component.html",
  styleUrls: ["./update-weekly-menu.component.css"],
})
export class UpdateWeeklyMenuComponent implements OnInit {
  selectedFile: File;
  user: User;
  dayMenu: Menus;
  //private dayMenu = new Subject<Menus>();
  reader = new FileReader();
  uploadImageData = new FormData();
  weeklyMenuUpdateFormGroup: FormGroup;
  weekdays: string[] = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thrusday",
    "Friday",
    "Saturday",
  ];
  constructor(
    private formBuilder: FormBuilder,
    private updateMenuService: UpdateMenuService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.weeklyMenuUpdateFormGroup = this.formBuilder.group({
      mondayMenu: this.formBuilder.group({
        id: ["1"],
        day: ["Monday"],
        name: [""],
        description: [""],
        price: [""],
        image: [this.uploadImageData],
      }),
      tuedayMenu: this.formBuilder.group({
        id: ["2"],
        day: ["Tuesday"],
        name: [""],
        description: [""],
        price: [""],
      }),
      weddayMenu: this.formBuilder.group({
        id: ["3"],
        day: ["Wednesday"],
        name: [""],
        description: [""],
        price: [""],
      }),
      thrusdayMenu: this.formBuilder.group({
        id: ["4"],
        day: ["Thrusday"],
        name: [""],
        description: [""],
        price: [""],
      }),
      fridayMenu: this.formBuilder.group({
        id: ["5"],
        day: ["Friday"],
        name: [""],
        description: [""],
        price: [""],
      }),
      satdayMenu: this.formBuilder.group({
        id: ["6"],
        day: ["Saturday"],
        name: [""],
        description: [""],
        price: [""],
      }),
      sundayMenu: this.formBuilder.group({
        id: ["7"],
        day: ["Sunday"],
        name: [""],
        description: [""],
        price: [""],
      }),
    });
    //this.updateMenuService.menu.subscribe((menu) => (this.dayMenu = menu));
  }
  onSubmit() {
    //let updatedmenu= new Day();
    // console.log(this.selectedFile);
    // Day.Monday = this.weeklyMenuUpdateFormGroup.controls["mondayMenu"].value;
    // Day.Tuesday = this.weeklyMenuUpdateFormGroup.controls["tuedayMenu"].value;
    // Day.Wednesday = this.weeklyMenuUpdateFormGroup.controls["weddayMenu"].value;
    // Day.Thrusday =
    //   this.weeklyMenuUpdateFormGroup.controls["thrusdayMenu"].value;
    // Day.Friday = this.weeklyMenuUpdateFormGroup.controls["fridayMenu"].value;
    // Day.Saturday = this.weeklyMenuUpdateFormGroup.controls["satdayMenu"].value;
    // Day.Sunday = this.weeklyMenuUpdateFormGroup.controls["sundayMenu"].value;
    // console.log(Day.Thrusday);
    // console.log(Day.Tuesday);
    // this.updateMenuService
    //   .weeklyMenuUpdate([
    //     Day.Monday,
    //     Day.Tuesday,
    //     Day.Wednesday,
    //     Day.Thrusday,
    //     Day.Friday,
    //     Day.Saturday,
    //     Day.Sunday,
    //   ])
    //   .subscribe({
    //     next: (response) => {
    //       alert(
    //         `Your order has been received.\nOrder tracking number: ${response.id}`
    //       );
    //       // reset cart
    //       //this.resetCart();
    //     },
    //     error: (err) => {
    //       alert(`There was an error: ${err.message}`);
    //     },
    //   });
  }
  onUpload() {
    console.log(this.selectedFile);
    let Filename;
    //FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
    const uploadImageData = new FormData();
    if (this.selectedFile.name.includes(".")) {
      let index = this.selectedFile.name.indexOf(".");
      Filename = this.selectedFile.name.substring(0, index);
    }
    uploadImageData.append("imageFile", this.selectedFile, Filename);
    this.updateMenuService.uploadImage(uploadImageData);
  }
  public onFileChanged(event) {
    //Select File
    this.selectedFile = event.target.files[0];
    this.onUpload();
  }
  handleLogout() {
    this.authService.logout();
  }

  updateMenu(day: string) {
    let baseUrl = environment.baseUrl;
    let id = this.getId(day);
    let baseUrl1 = baseUrl + "menu/search/findById" + "?id=" + id;
    this.authService.loggedinUser.subscribe((data) => (this.user = data));
    let token = this.user.token;
    let header = new HttpHeaders().set("Authorization", token);

    this.authService.loggedinUser.subscribe((user) => {});
    this.updateMenuService.getMenubyId(baseUrl1, header, day);

    // this.router.navigate(["updateMenu", day]);

    let dayMenu: Menus;
    switch (day) {
      case "Monday":
        dayMenu = this.weeklyMenuUpdateFormGroup.controls["mondayMenu"].value;
        break;
      case "Tuesday":
        dayMenu = this.weeklyMenuUpdateFormGroup.controls["tuedayMenu"].value;
        break;
      case "Wednesday":
        dayMenu = this.weeklyMenuUpdateFormGroup.controls["weddayMenu"].value;
        break;
      case "Thrusday":
        dayMenu = this.weeklyMenuUpdateFormGroup.controls["thrusdayMenu"].value;
        break;
      case "Friday":
        dayMenu = this.weeklyMenuUpdateFormGroup.controls["fridayMenu"].value;
        break;
      case "Saturday":
        dayMenu = this.weeklyMenuUpdateFormGroup.controls["satdayMenu"].value;
        break;
      case "Sunday":
        dayMenu = this.weeklyMenuUpdateFormGroup.controls["sundayMenu"].value;
        break;
    }
    // this.updateMenuService.updateDayMenu(dayMenu);
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
