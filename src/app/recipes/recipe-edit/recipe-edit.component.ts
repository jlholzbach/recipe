import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})

export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;
  ingredients: FormArray;

  constructor(private route: ActivatedRoute, private recipeService: RecipeService, private router: Router) { }

  get ingredientsData() {
    return <FormArray>this.recipeForm.get('ingredients');
  }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
          this.id = +params['id'];
          this.editMode  = params['id'] != null;
          this.initForm();
      }
    );
  }

  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;

      if (recipe.ingredients) {
        for (let ingredient of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              'id': new FormControl(ingredient.id),
              'name': new FormControl(ingredient.name, [Validators.required]),
              'amount': new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
            })
          );
        }
      }
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, [Validators.required]),
      'imagePath': new FormControl(recipeImagePath, [Validators.required]),
      'description': new FormControl(recipeDescription, [Validators.required]),
      'ingredients': recipeIngredients
    });
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'id': new FormControl(null),
        'name': new FormControl(null, [Validators.required]),
        'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    );
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onIngredientDelete(index: number) {
    let ingredientId = (<FormArray>this.recipeForm.get('ingredients')).at(index)['controls']['id']['value'];

    if (ingredientId !== null) {
      this.recipeService.deleteIngredient(ingredientId).subscribe((response: boolean) => {
        if (response) {
          (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
        }
      });
    }

    else {
      (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
    }
  }

  onSubmit() {
    if (this.editMode) {
      this.recipeForm.value['id'] = this.id;
      this.recipeService.updateRecipe(this.recipeForm.value);
    }

    else {
      this.recipeService.addRecipe(this.recipeForm.value);
    }

    this.router.navigate(['../'], {relativeTo: this.route});
  }

}
