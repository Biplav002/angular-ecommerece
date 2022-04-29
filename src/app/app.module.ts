import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ProductListComponent } from "./components/product-list/product-list.component";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular//common/http";
import { ProductService } from "./services/product.service";

import { MenuDisplayComponent } from "./menu-display/menu-display.component";
import { Routes, RouterModule, Router } from "@angular/router";
import { PageDisplayComponent } from "./page-display/page-display.component";
import { MenuDisplayService } from "./services/menu-display.service";
import { DayMenuComponent } from "./components/day-menu/day-menu.component";
import { UpdateWeeklyMenuComponent } from "./components/update-weekly-menu/update-weekly-menu.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ImageAppComponent } from "./components/image-app/image-app.component";

import { LoginStatusComponent } from "./components/login-status/login-status.component";

import myAppConfig from "./config/my-app-config";

import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { AuthGuard } from "./auth/auth-gaurd";
import { AuthInterceptor } from "./services/AuthInterceptor";
import { CartStatusComponent } from "./components/cart-status/cart-status.component";
import { CartService } from "./services/cart-service";
import { CartDetailsComponent } from "./components/cart-details/cart-details.component";
import { CheckoutComponent } from "./components/checkout/checkout.component";
import { WelcomeComponent } from "./components/welcome/welcome.component";
import { HeaderComponent } from "./header/header.component";
import { UpdateMenuComponent } from "./components/update-menu/update-menu.component";
import { OrderComponent } from "./components/order/order.component";
import { SummaryComponent } from "./components/summary/summary.component";
import { PaymentsuccessfulComponent } from "./components/paymentsuccessful/paymentsuccessful.component";

const appRoutes: Routes = [
  // { path: "", component: HeaderComponent },
  { path: "", component: WelcomeComponent },
  { path: "menuDisplay", component: MenuDisplayComponent },
  { path: "welcome", component: WelcomeComponent },
  { path: "pageDisplay", component: ProductListComponent },
  { path: "dayMenu", component: DayMenuComponent },
  { path: "updateMenu/:day", component: UpdateMenuComponent },
  {
    path: "updateMenu",

    component: UpdateWeeklyMenuComponent,
    canActivate: [AuthGuard],
  },
  { path: "signup", component: RegisterComponent },

  { path: "login", component: LoginComponent },
  { path: "cart-details", component: CartDetailsComponent },
  { path: "checkout", component: CheckoutComponent },
  { path: "signup", component: RegisterComponent },
  { path: "order", component: OrderComponent },
  { path: "summary", component: SummaryComponent },
  { path: "paymentSuccess", component: PaymentsuccessfulComponent },
];
@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,

    MenuDisplayComponent,
    PageDisplayComponent,
    DayMenuComponent,
    UpdateWeeklyMenuComponent,
    ImageAppComponent,
    LoginComponent,
    LoginStatusComponent,
    RegisterComponent,
    CartStatusComponent,
    CartDetailsComponent,
    CheckoutComponent,
    WelcomeComponent,
    HeaderComponent,
    UpdateMenuComponent,
    OrderComponent,
    SummaryComponent,
    PaymentsuccessfulComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,

    RouterModule.forRoot(appRoutes),
  ],
  providers: [
    ProductService,
    MenuDisplayService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    CartService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
