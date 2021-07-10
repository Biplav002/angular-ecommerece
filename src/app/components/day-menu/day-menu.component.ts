import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Menus } from 'src/app/common/menus';
import { PassServiceService } from 'src/app/services/pass-service.service';
import { MenuDisplayService } from 'src/app/services/menu-display.service';

@Component({
  selector: 'app-day-menu',
  templateUrl: './day-menu.component.html',
  styleUrls: ['./day-menu.component.css']
})
export class DayMenuComponent implements OnInit {
id:number;
dayMenu:Menus[];
  constructor(private route:ActivatedRoute,private idPassService:PassServiceService,private menuDisplayService:MenuDisplayService) { }

  ngOnInit(): void {
    this.idPassService.currentId.subscribe(msg => this.id = msg);
  this.menuDisplayService.getDayMenu(this.id).subscribe(data=>{
this.dayMenu=data;
console.log(this.dayMenu);
  });
  }
  
}
