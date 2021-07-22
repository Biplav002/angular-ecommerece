import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Menus } from '../common/menus';

@Injectable({
  providedIn: 'root'
})
export class UpdateMenuService {
baseUrl=environment.baseUrl;
  private updateUrl = this.baseUrl+'api/update/menu';

  constructor(private httpClient: HttpClient) { }

  weeklyMenuUpdate(menus: Menus[]): Observable<any> {
    console.log(JSON.stringify(menus));
    return this.httpClient.post<Menus[]>(this.updateUrl, menus);    

  }
  
}
