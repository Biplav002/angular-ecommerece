import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Menus } from '../common/menus';
import { AuthService } from './auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class UpdateMenuService {
baseUrl=environment.baseUrl;
  private updateUrl = this.baseUrl+'api/update/menu';
  message: string;
  constructor(private httpClient: HttpClient,private authService: AuthService) { }

  weeklyMenuUpdate(menus: Menus[]): Observable<any> {
    console.log(JSON.stringify(menus));
    return this.httpClient.post<Menus[]>(this.updateUrl, menus);    

  }
  
  uploadImage(uploadImageData: FormData) {
    
    //Make a call to the Spring Boot Application to save the image
    this.httpClient.post('http://localhost:8080/image/upload', uploadImageData, { observe: 'response' })
      .subscribe((response) => {
        if (response.status === 200) {
          this.message = 'Image uploaded successfully';
        } else {
          this.message = 'Image not uploaded successfully';
        }
      }
      );    

  }
}
