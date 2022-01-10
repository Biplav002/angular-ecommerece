import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular//common/http'
import { ProductService } from './services/product.service';
import { HeaderComponent } from './header/header.component';
import { MenuDisplayComponent } from './menu-display/menu-display.component';
import { Routes, RouterModule, Router } from '@angular/router';
import { PageDisplayComponent } from './page-display/page-display.component';
import { MenuDisplayService } from './services/menu-display.service';
import { DayMenuComponent } from './components/day-menu/day-menu.component';
import { UpdateWeeklyMenuComponent } from './components/update-weekly-menu/update-weekly-menu.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImageAppComponent } from './components/image-app/image-app.component';

import { LoginStatusComponent } from './components/login-status/login-status.component';

import {
  OKTA_CONFIG,
  OktaAuthModule,
  OktaCallbackComponent
} from '@okta/okta-angular';
import myAppConfig from './config/my-app-config';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './auth/auth-gaurd';
import { AuthInterceptor } from './services/AuthInterceptor';





const oktaConfig = Object.assign({
  onAuthRequired: (injector) => {
    const router = injector.get(Router);

    // Redirect the user to your custom login page
    router.navigate(['/login']);
  }
}, myAppConfig.oidc);

const appRoutes: Routes = [
  { path: '', component: HeaderComponent },
  { path: 'menuDisplay', component: MenuDisplayComponent },
  { path: 'pageDisplay', component: ProductListComponent },
  { path: 'dayMenu', component: DayMenuComponent },
  { path: 'updateMenu', 
 
  component:UpdateWeeklyMenuComponent, canActivate: [AuthGuard],},
  {path: 'signup', component: RegisterComponent}, 
 
 {path: 'login', component: LoginComponent}
 
  
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
    ImageAppComponent,
    LoginComponent,
    LoginStatusComponent,
    RegisterComponent,
 
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    OktaAuthModule,
    RouterModule.forRoot(appRoutes),
    
  ],
  providers: [ProductService,MenuDisplayService,{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
