import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredients.model';


@Injectable()
export class ShoppingListService {
    ingredientsChanged = new Subject<Ingredient[]>();
    startedEditing = new Subject<number>();

    private ingredients: Ingredient[] = [ 
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10),
    ];

    getIngredients() {
        return this.ingredients.slice();
    }

    getIngredient(index: number) {
        return this.ingredients[index]
    }

    addIngredient(ingredient: Ingredient) {
        //add ingredient to ingredients array
        this.ingredients.push(ingredient);
        //emit an event upon addition
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    updateIngredient(index: number, newIngredient: Ingredient) {
        //update ingredient
        this.ingredients[index] = newIngredient;
        //return a copy of ingredients array
        this.ingredientsChanged.next(this.ingredients.slice())
    }

    deleteIngredient(index: number) {
        //remove an ingredient
        this.ingredients.splice(index, 1);
        this.ingredientsChanged.next(this.ingredients.slice())
    }

    addIngredientsFromRecipes(ingredients: Ingredient[]) {
        // use the spread operator to turn an array to a list
        this.ingredients.push(...ingredients)
        //emit an event to mark change
        this.ingredientsChanged.next(this.ingredients.slice())
        
    }
}