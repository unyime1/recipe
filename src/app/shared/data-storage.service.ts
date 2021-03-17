import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import { map, tap } from 'rxjs/operators';
import { AuthServiceService } from '../auth/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(
    private http: HttpClient, 
    private recipeService: RecipeService, 
    private authService: AuthServiceService
  ) { }

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http
      .put(
        'https://recipe-book-9ec21.firebaseio.com/recipes.json',
        recipes
      )
      .subscribe(response => {
        console.log(response);
      });
  }

  fetchRecipes() {
    //subscribe to the user sub, use it once, and unsubscribe;
    
    return this.http.get<Recipe[]>(
      'https://recipe-book-9ec21.firebaseio.com/recipes.json'
    ).pipe(
      map(recipes => {
        return recipes.map(recipe => {
          return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] }
        });
      }),
      tap(recipes => {
        this.recipeService.setRecipes(recipes);
      })  
    )
   
  }
}
