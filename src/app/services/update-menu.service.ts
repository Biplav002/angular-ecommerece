import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Menus } from '../common/menus';

@Injectable({
  providedIn: 'root'
})
export class UpdateMenuService {

  private updateUrl = 'http://localhost:8080/api/update/menu';

  constructor(private httpClient: HttpClient) { }

  weeklyMenuUpdate(menus: Menus[]): Observable<any> {
    console.log(JSON.stringify(menus[0]));
    return this.httpClient.post<Menus[]>(this.updateUrl, menus);    

  }
  
}
