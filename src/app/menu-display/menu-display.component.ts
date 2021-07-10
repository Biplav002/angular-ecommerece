import { Component, OnInit } from '@angular/core';
import { Product } from '../common/product';
import { ProductService } from '../services/product.service';
import { MenuDisplayService } from '../services/menu-display.service';
import {  Menus } from '../common/menus';
import { PassServiceService } from '../services/pass-service.service';

@Component({
  selector: 'app-menu-display',
  templateUrl: './menu-display.component.html',
  styleUrls: ['./menu-display.component.css']
})
export class MenuDisplayComponent implements OnInit {
 m: Menus[];
 dayMenu:Menus;
 id:number;
  constructor(private menuDisplayService: MenuDisplayService,private idPassService:PassServiceService) { }

  ngOnInit(): void {
    this.listMenu();
  }
  listMenu() {
    this.menuDisplayService.getMenuList().subscribe(
      data => {
        this.m = data;
        console.log(data);
      }
    )
  }
  daySelected($event:any)
  {
    console.log($event.target.innerHTML);
  
  this.id=this.getId($event.target.innerHTML);
  this.idPassService.updateApprovalMessage(this.id);
 // this.menuDisplayService.getDayMenu(this.id).subscribe(data=>{
//this.dayMenu=data;
//console.log(this.dayMenu);
  //});
  }


  getId(day:string):number{
  switch(day) { 
    case 'Monday': { 
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


