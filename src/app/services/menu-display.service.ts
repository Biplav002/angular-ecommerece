import { Injectable } from '@angular/core';
import {  Menus } from '../common/menus';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MenuDisplayService {
  baseUrl1=environment.baseUrl;
  private baseUrl = this.baseUrl1+'api/menu';


  constructor(private httpClient: HttpClient) { }

  getMenuList(): Observable<Menus[]> {
   
    return this.httpClient.get<GetResponse>(this.baseUrl).pipe(
      map(response => response._embedded.menus)
    );
  
  }
  getDayMenu(id:number): Observable<Menus[]> {
   console.log(this.baseUrl+'/'+id);
   const searchUrl = `${this.baseUrl}/search/findById?id=${id}`;
    return this.httpClient.get<GetResponse>(searchUrl).pipe(
      map(response => response._embedded.menus)
    );
  
  }

}
interface GetResponse {
  _embedded: {
    menus: Menus[];
  }
}
interface GetSingleResponse {
  
    menu: Menus;
  
}