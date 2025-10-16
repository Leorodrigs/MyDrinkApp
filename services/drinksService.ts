import drinksData from "@/data/drinks_brazil.json";

export type DrinkBR = {
  idDrink: string;
  strDrink: string;
  strCategory: string;
  strAlcoholic: string;
  strGlass: string;
  strInstructions: string;
  strDrinkThumb: string;
  strIngredient1?: string | null;
  strIngredient2?: string | null;
  strIngredient3?: string | null;
  strIngredient4?: string | null;
  strIngredient5?: string | null;
  strIngredient6?: string | null;
  strIngredient7?: string | null;
  strIngredient8?: string | null;
  strIngredient9?: string | null;
  strIngredient10?: string | null;
  strIngredient11?: string | null;
  strIngredient12?: string | null;
  strIngredient13?: string | null;
  strIngredient14?: string | null;
  strIngredient15?: string | null;
  strMeasure1?: string | null;
  strMeasure2?: string | null;
  strMeasure3?: string | null;
  strMeasure4?: string | null;
  strMeasure5?: string | null;
  strMeasure6?: string | null;
  strMeasure7?: string | null;
  strMeasure8?: string | null;
  strMeasure9?: string | null;
  strMeasure10?: string | null;
  strMeasure11?: string | null;
  strMeasure12?: string | null;
  strMeasure13?: string | null;
  strMeasure14?: string | null;
  strMeasure15?: string | null;
};

// Tipo simplificado para uso nas telas
export type DrinkSimplified = {
  idDrink: string;
  strDrink: string;
  strCategory: string;
  strAlcoholic: string;
  strGlass: string;
  strInstructions: string;
  strDrinkThumb: string;
  ingredients: Array<{
    name: string;
    measure: string;
  }>;
};

class DrinksService {
  private drinks: DrinkBR[] = drinksData as DrinkBR[];

  // Buscar todos os drinks
  getAllDrinks(): DrinkBR[] {
    return this.drinks;
  }

  // Buscar drink por ID
  getDrinkById(id: string): DrinkBR | undefined {
    return this.drinks.find((drink) => drink.idDrink === id);
  }

  // Buscar drink por ID (versão simplificada)
  getDrinkByIdSimplified(id: string): DrinkSimplified | undefined {
    const drink = this.getDrinkById(id);
    if (!drink) return undefined;

    return {
      idDrink: drink.idDrink,
      strDrink: drink.strDrink,
      strCategory: drink.strCategory,
      strAlcoholic: drink.strAlcoholic,
      strGlass: drink.strGlass,
      strInstructions: drink.strInstructions,
      strDrinkThumb: drink.strDrinkThumb,
      ingredients: this.getIngredientsFromDrink(drink),
    };
  }

  // Extrair ingredientes de um drink
  private getIngredientsFromDrink(
    drink: DrinkBR
  ): Array<{ name: string; measure: string }> {
    const ingredients: Array<{ name: string; measure: string }> = [];

    for (let i = 1; i <= 15; i++) {
      const ingredientKey = `strIngredient${i}` as keyof DrinkBR;
      const measureKey = `strMeasure${i}` as keyof DrinkBR;

      const ingredient = drink[ingredientKey];
      const measure = drink[measureKey];

      if (ingredient && ingredient !== null) {
        ingredients.push({
          name: ingredient as string,
          measure: (measure as string) || "",
        });
      }
    }

    return ingredients;
  }

  // Buscar drinks por nome
  searchDrinks(query: string): DrinkBR[] {
    const lowerQuery = query.toLowerCase();
    return this.drinks.filter((drink) =>
      drink.strDrink.toLowerCase().includes(lowerQuery)
    );
  }

  // Buscar drinks por categoria
  getDrinksByCategory(category: string): DrinkBR[] {
    return this.drinks.filter(
      (drink) => drink.strCategory.toLowerCase() === category.toLowerCase()
    );
  }

  // Buscar drinks por ingrediente
  getDrinksByIngredient(ingredientName: string): DrinkBR[] {
    const lowerIngredient = ingredientName.toLowerCase();

    return this.drinks.filter((drink) => {
      for (let i = 1; i <= 15; i++) {
        const ingredientKey = `strIngredient${i}` as keyof DrinkBR;
        const ingredient = drink[ingredientKey];

        if (
          ingredient &&
          (ingredient as string).toLowerCase() === lowerIngredient
        ) {
          return true;
        }
      }
      return false;
    });
  }

  // Buscar drinks por copo
  getDrinksByGlass(glassName: string): DrinkBR[] {
    return this.drinks.filter(
      (drink) => drink.strGlass.toLowerCase() === glassName.toLowerCase()
    );
  }

  // Obter todas as categorias únicas
  getCategories(): string[] {
    const categories = new Set(this.drinks.map((d) => d.strCategory));
    return Array.from(categories).sort();
  }

  // Obter todos os ingredientes únicos
  getIngredients(): string[] {
    const ingredients = new Set<string>();

    this.drinks.forEach((drink) => {
      for (let i = 1; i <= 15; i++) {
        const ingredientKey = `strIngredient${i}` as keyof DrinkBR;
        const ingredient = drink[ingredientKey];

        if (ingredient && ingredient !== null) {
          ingredients.add(ingredient as string);
        }
      }
    });

    return Array.from(ingredients).sort();
  }

  // Obter todos os copos únicos
  getGlasses(): string[] {
    const glasses = new Set(this.drinks.map((d) => d.strGlass));
    return Array.from(glasses).sort();
  }

  // Buscar drinks alcoólicos ou não alcoólicos
  getDrinksByAlcoholic(isAlcoholic: boolean): DrinkBR[] {
    const searchTerm = isAlcoholic ? "Alcoólico" : "Não Alcoólico";
    return this.drinks.filter((drink) => drink.strAlcoholic === searchTerm);
  }
}

export const drinksService = new DrinksService();
