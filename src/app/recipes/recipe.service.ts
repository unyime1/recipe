import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredients.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable()
export class RecipeService {
    recipesChanged = new Subject<Recipe[]>();
    
    // private recipes: Recipe[] = [
    //     new Recipe('A Test Recipe', 
    //     'This is simply a test', 
    //     'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Rashidun_Caliph_Ali_ibn_Abi_Talib_-_%D8%B9%D9%84%D9%8A_%D8%A8%D9%86_%D8%A3%D8%A8%D9%8A_%D8%B7%D8%A7%D9%84%D8%A8.svg/800px-Rashidun_Caliph_Ali_ibn_Abi_Talib_-_%D8%B9%D9%84%D9%8A_%D8%A8%D9%86_%D8%A3%D8%A8%D9%8A_%D8%B7%D8%A7%D9%84%D8%A8.svg.png',
    //     [
    //         new Ingredient('meat', 1),
    //         new Ingredient('meat pie', 50),
    //     ]),

    //     new Recipe('A fried rice', 
    //     'This is simply a rice test', 
    //     'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Rashidun_Caliph_Ali_ibn_Abi_Talib_-_%D8%B9%D9%84%D9%8A_%D8%A8%D9%86_%D8%A3%D8%A8%D9%8A_%D8%B7%D8%A7%D9%84%D8%A8.svg/800px-Rashidun_Caliph_Ali_ibn_Abi_Talib_-_%D8%B9%D9%84%D9%8A_%D8%A8%D9%86_%D8%A3%D8%A8%D9%8A_%D8%B7%D8%A7%D9%84%D8%A8.svg.png',
    //     [
    //         new Ingredient('meat', 1),
    //         new Ingredient('rice', 50),
    //     ]),

    // ];

    private recipes: Recipe[] = [];

    constructor(private slService: ShoppingListService){

    }

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }

    getRecipes() {
        return this.recipes.slice();
    }

    getRecipe(index: number) {
        return this.recipes[index];
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }

    addtoShoppingList(ingredients: Ingredient[]) {
        this.slService.addIngredientsFromRecipes(ingredients);
    }
    
}