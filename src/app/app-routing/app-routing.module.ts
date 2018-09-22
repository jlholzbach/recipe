import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from "@angular/router";

import { AccountComponent } from '../account/account.component';
import { LoginComponent } from '../account/login/login.component';
import { RegisterComponent } from '../account/register/register.component';
import { RecipesComponent } from '../recipes/recipes.component';
import { LandingComponent } from '../landing/landing.component';

const appRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/landing' },
  { path: 'landing', component: LandingComponent },
  { path: 'account', component: AccountComponent, children: [
    { path: '', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
  ] },
  { path: 'recipes', component: RecipesComponent }
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
