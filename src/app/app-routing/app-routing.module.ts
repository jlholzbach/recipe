import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from "@angular/router";

import { AccountComponent } from '../account/account.component';
import { LoginComponent } from '../account/login/login.component';
import { RegisterComponent } from '../account/register/register.component';
import { RecipesComponent } from '../recipes/recipes.component';
import { RecipeDetailComponent } from '../recipes/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from '../recipes/recipe-edit/recipe-edit.component';
import { RecipeSelectComponent } from '../recipes/recipe-select/recipe-select.component';
import { LandingComponent } from '../landing/landing.component';

const appRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/landing' },
  { path: 'account', component: AccountComponent, children: [
    { path: '', component: LoginComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
  ]},
  { path: 'landing', component: LandingComponent },
  { path: 'recipes', component: RecipesComponent, children: [
    { path: '', component: RecipeSelectComponent },
    { path: 'new', component: RecipeEditComponent },
    { path: ':id', component: RecipeDetailComponent },
    { path: ':id/edit', component: RecipeEditComponent }
  ] }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  declarations: [],
  exports: [RouterModule]
})

export class AppRoutingModule { }
