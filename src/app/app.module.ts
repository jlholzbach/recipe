import { BrowserModule } from '@angular/platform-browser';
import { CollapseModule } from 'ngx-bootstrap';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing/app-routing.module';

import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { AccountComponent } from './account/account.component';
import { RegisterComponent } from './account/register/register.component';
import { LoginComponent } from './account/login/login.component';
import { HeaderComponent } from './header/header.component';

import { AuthService } from './auth/auth.service';
import { ActiveFieldDirective } from './account/active-field/active-field.directive';
import { RecipesComponent } from './recipes/recipes.component';

@NgModule({
  declarations: [
    AppComponent,
    ActiveFieldDirective,
    LandingComponent,
    AccountComponent,
    RegisterComponent,
    LoginComponent,
    HeaderComponent,
    RecipesComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    CollapseModule.forRoot(),
    FormsModule,
    HttpClientModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
