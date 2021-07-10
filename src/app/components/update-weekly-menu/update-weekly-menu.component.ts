import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Day } from 'src/app/common/day';
import { Menus } from 'src/app/common/menus';
import { UpdateMenuService } from 'src/app/services/update-menu.service';

@Component({
  selector: 'app-update-weekly-menu',
  templateUrl: './update-weekly-menu.component.html',
  styleUrls: ['./update-weekly-menu.component.css']
})
export class UpdateWeeklyMenuComponent implements OnInit {

  weeklyMenuUpdateFormGroup:FormGroup;
  constructor(private formBuilder:FormBuilder,private updateMenuService:UpdateMenuService) { 


  }

  ngOnInit(): void {
 this.weeklyMenuUpdateFormGroup=this.formBuilder.group({
   mondayMenu:this.formBuilder.group({
    id:['1'],
    day:['Monday'], 
    name:[''],
     description:[''],
     price:['']
   }),
   tuedayMenu:this.formBuilder.group({
    id:['2'],
    day:['Tuesday'],
    name:[''],
    description:[''],
    price:['']
  }),
  weddayMenu:this.formBuilder.group({
    id:['3'],
    day:['Wednesday'],
    name:[''],
    description:[''],
    price:['']
  }),
  thrusdayMenu:this.formBuilder.group({
    id:['4'],
    day:['Thrusday'],
    name:[''],
    description:[''],
    price:['']
  }),
  fridayMenu:this.formBuilder.group({
    id:['5'],
    day:['Friday'],
    name:[''],
    description:[''],
    price:['']
  }),
  satdayMenu:this.formBuilder.group({
    id:['6'],
    day:['Saturday'],
    name:[''],
    description:[''],
    price:['']
  }),
  sundayMenu:this.formBuilder.group({
    id:['7'],
    day:['Sunday'],
    name:[''],
    description:[''],
    price:['']
  })
 });
  }
  onSubmit(){
    //let updatedmenu= new Day();
    Day.Monday = this.weeklyMenuUpdateFormGroup.controls['mondayMenu'].value;
    Day.Tuesday = this.weeklyMenuUpdateFormGroup.controls['tuedayMenu'].value;
    Day.Wednesday = this.weeklyMenuUpdateFormGroup.controls['weddayMenu'].value;
   Day.Thrusday = this.weeklyMenuUpdateFormGroup.controls['thrusdayMenu'].value;
    Day.Friday = this.weeklyMenuUpdateFormGroup.controls['fridayMenu'].value;
    Day.Saturday = this.weeklyMenuUpdateFormGroup.controls['satdayMenu'].value;
    Day.Sunday = this.weeklyMenuUpdateFormGroup.controls['sundayMenu'].value;
    console.log( Day.Thrusday);
    console.log( Day.Tuesday);
    this.updateMenuService.weeklyMenuUpdate ([Day.Monday,Day.Tuesday,Day.Wednesday,Day.Thrusday,Day.Friday,Day.Saturday,Day.Sunday]).subscribe({
      next: response => {
        alert(`Your order has been received.\nOrder tracking number: ${response.id}`);
  
        // reset cart
        //this.resetCart();
  
      },
      error: err => {
        alert(`There was an error: ${err.message}`);
      }
    }
  );
  }
}