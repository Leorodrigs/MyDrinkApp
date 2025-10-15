export interface Drink {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
  strCategory?: string;
  strGlass?: string;
  strInstructions?: string;
}

export interface Category {
  strCategory: string;
}

export interface Ingredient {
  strIngredient1: string;
}

export interface Glass {
  strGlass: string;
}
