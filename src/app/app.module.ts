import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import {HttpClientModule} from '@angular//common/http'
import { ProductService } from './services/product.service';
import { HeaderComponent } from './header/header.component';
import { MenuDisplayComponent } from './menu-display/menu-display.component';
import { Routes, RouterModule } from '@angular/router';
import { PageDisplayComponent } from './page-display/page-display.component';
import { MenuDisplayService } from './services/menu-display.service';
import { DayMenuComponent } from './components/day-menu/day-menu.component';
import { UpdateWeeklyMenuComponent } from './components/update-weekly-menu/update-weekly-menu.component';
import { ReactiveFormsModule } from '@angular/forms';


const appRoutes: Routes = [
  { path: '', component: HeaderComponent },
  { path: 'menuDisplay', component: MenuDisplayComponent },
  { path: 'pageDisplay', component: ProductListComponent },
  { path: 'dayMenu', component: DayMenuComponent },
  { path: 'updateMenu', component:UpdateWeeklyMenuComponent}
  
  // { path: 'not-found', component: PageNotFoundComponent },
  
];
@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    HeaderComponent,
    MenuDisplayComponent,
    PageDisplayComponent,
    DayMenuComponent,
    UpdateWeeklyMenuComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    
  ],
  providers: [ProductService,MenuDisplayService],
  bootstrap: [AppComponent]
})
export class AppModule { }
