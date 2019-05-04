import { BrowserModule } from '@angular/platform-browser';
import { CollapseModule } from 'ngx-bootstrap';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ActiveFieldDirective } from './account/active-field/active-field.directive';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { AuthService } from './auth/auth.service';
import { DropdownDirective } from './shared/dropdown.directive';
import { HeaderComponent } from './header/header.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipeItemComponent } from './recipes/recipe-list/recipe-item/recipe-item.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeSelectComponent } from './recipes/recipe-select/recipe-select.component';
import { RecipeService } from './recipes/recipe.service';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import { ShoppingListService } from './shopping-list/shopping-list.service';
import { LandingComponent } from './landing/landing.component';
import { AccountComponent } from './account/account.component';
import { LoginComponent } from './account/login/login.component';
import { RegisterComponent } from './account/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    ShoppingListComponent,
    RecipesComponent,
    LandingComponent,
    HeaderComponent,
    RecipeDetailComponent,
    RecipeEditComponent,
    RecipeListComponent,
    RecipeItemComponent,
    RecipeSelectComponent,
    ShoppingEditComponent,
    DropdownDirective,
    AccountComponent,
    LoginComponent,
    RegisterComponent,
    ActiveFieldDirective
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    CollapseModule.forRoot(),
    FormsModule,
    HttpClientModule,
    HttpModule,
    ReactiveFormsModule,
  ],
  providers: [AuthService, RecipeService, ShoppingListService],
  bootstrap: [AppComponent]
})
export class AppModule { }
