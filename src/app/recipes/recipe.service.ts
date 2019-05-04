import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import { Subject } from 'rxjs';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';

@Injectable()

export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
  private recipes: Recipe[] = [];

  constructor(private http: HttpClient){ }

  addRecipe(recipe: Recipe) {
    let ingredients: Ingredient[] = [];

    this.http.get('http://www.joshuaholzbach.com/recipeService/createRecipe.php', {
      params: {
        account: sessionStorage.getItem('account'),
        name: recipe['name'],
        description: recipe['description'],
        imagePath: recipe['imagePath'],
        ingredients: JSON.stringify(recipe['ingredients'])
      }
    }).subscribe(
        (resp: object[]) => {
          if (resp['id'] != 0) {
            for (let i = 0; i < resp['ingredientIds'].length; i++) {
              recipe['ingredients'][i]['id'] = resp['ingredientIds'][i];
            }

            console.log(recipe);
            console.log("Testing");
            this.recipes.push(new Recipe(resp['id'], recipe['name'], recipe['description'], recipe['imagePath'], recipe['ingredients']));
            console.log(this.recipes);
            this.recipesChanged.next(this.recipes.slice());
          }

          /*if (recipeId != 0) {
            console.log("Testing");
            this.recipes.push(new Recipe(recipeId, recipe['name'], recipe['description'], recipe['imagePath'], recipe['ingredients']));
            console.log(this.recipes);
            this.recipesChanged.next(this.recipes.slice());
          }*/
        }
    );

    /*this.http.get('http://www.joshuaholzbach.com/recipeService/createRecipe.php', {
      params: {
        account: sessionStorage.getItem('account'),
        name: recipe['name'],
        description: recipe['description'],
        imagePath: recipe['imagePath'],
        ingredients: JSON.stringify(recipe['ingredients'])
      }
    }).subscribe(
      (recipeId: number) => {
        console.log("Test");

        if (recipeId != 0) {
          console.log("Testing");
          this.recipes.push(new Recipe(recipeId, recipe['name'], recipe['description'], recipe['imagePath'], recipe['ingredients']));
          console.log(this.recipes);
          this.recipesChanged.next(this.recipes.slice());
        }
      }
    );*/

    //this.recipes.push(recipe);
    //this.recipesChanged.next(this.recipes.slice());
  }

  deleteIngredient(id: string) {
    return this.http.get('http://www.joshuaholzbach.com/recipeService/deleteIngredient.php', {
      params: {
        id: id
      }
    });

    /*.subscribe(
      (result: boolean) => {
        return result;
      }
    );*/
  }

  /*getId() {
    const recipeLength = this.recipes.length-1;

    if (recipeLength != -1) {
      return this.recipes[recipeLength].id+1;
    }

    else {
      return 1;
    }
  }*/

  getRecipe(id: number) {
    const recipe = this.recipes.find(
      (r) => {
        return r.id === id;
      }
    );

    return recipe;
  }

  getRecipes() {
    this.http.get('http://www.joshuaholzbach.com/recipeService/getRecipes.php', {
      params: {
        account: sessionStorage.getItem("account")
      }
    }).subscribe(
      (recipes: Array<any>) => {
        let currentRecipes: Recipe[] = [];

        recipes.forEach((recipe) => {
          let ingredients: Ingredient[] = [];

          if (recipe['names'] !== null) {
            let ingredientNames = recipe['names'].split(",");
            let ingredientAmounts = recipe['amounts'].split(",");
            let ingredientIds = recipe['ids'].split(",");

            for (let i = 0; i < ingredientNames.length; i++) {
              ingredients.push(new Ingredient(ingredientIds[i], ingredientNames[i], ingredientAmounts[i]));
            }
          }

          currentRecipes.push(new Recipe(recipe['id'], recipe['name'], recipe['description'], recipe['image_path'], ingredients));
        });

        console.log(currentRecipes);
        this.setRecipes(currentRecipes);
      }
    )

    return [];
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(recipe: Recipe) {
    this.http.get('http://www.joshuaholzbach.com/recipeService/updateRecipe.php', {
      params: {
        id: recipe['id'].toString(),
        name: recipe['name'],
        description: recipe['description'],
        imagePath: recipe['imagePath']
      }
    }).subscribe(
      (result: string) => {
        console.log(result);
        if (result == "updated") {
          var foundIndex = this.recipes.findIndex(x => x.id == recipe['id']);
          this.recipes[foundIndex] = recipe;
          this.recipesChanged.next(this.recipes.slice());
        }
      }
    );

    /*var foundIndex = this.recipes.findIndex(x => x.id == recipe.id);
    this.recipes[foundIndex] = recipe;
    this.recipesChanged.next(this.recipes.slice());*/
  }

  deleteRecipe(recipe: Recipe) {
    var foundIndex = this.recipes.findIndex(x => x.id == recipe.id);
    this.recipes.splice(foundIndex, 1);
    this.recipesChanged.next(this.recipes.slice());
  }

}
