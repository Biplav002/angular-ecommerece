import { Injectable } from '@angular/core';
import { Menus } from '../common/menus';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MenuDisplayService {
  baseUrl1 = environment.baseUrl;
  private baseUrl = this.baseUrl1 + 'api/menu';
  menus: Menus[];

  constructor(private httpClient: HttpClient) {}

  getMenuList(): Observable<Menus[]> {
    return this.httpClient.get<any>(this.baseUrl);
  }
  getDayMenu(id: number): Observable<Menus> {
    console.log(this.baseUrl + '/' + id);
    const searchUrl = `${this.baseUrl}/search/findById?id=${id}`;
    return this.httpClient.get<any>(searchUrl);
  }

  getDayMenuImage(name: string): Observable<Menus[]> {
    console.log(`${this.baseUrl1}image/get/${name}`);
    const searchUrl = `${this.baseUrl1}image/get/${name}`;
    return this.httpClient.get<any>(searchUrl);
  }
}
interface GetResponse {
  _embedded: {
    menus: Menus[];
  };
}
interface GetSingleResponse {
  menu: Menus;
}
