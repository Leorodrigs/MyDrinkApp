const BASE_URL = "https://www.thecocktaildb.com/api/json/v1/1";

export const cocktailApi = {
  // Buscar drinks por nome
  searchDrinks: async (name: string) => {
    const response = await fetch(`${BASE_URL}/search.php?s=${name}`);
    return response.json();
  },

  // Listar todas as categorias
  listCategories: async () => {
    const response = await fetch(`${BASE_URL}/list.php?c=list`);
    return response.json();
  },

  // Listar todos os ingredientes
  listIngredients: async () => {
    const response = await fetch(`${BASE_URL}/list.php?i=list`);
    return response.json();
  },

  // Listar todos os tipos de copos
  listGlasses: async () => {
    const response = await fetch(`${BASE_URL}/list.php?g=list`);
    return response.json();
  },

  // Filtrar por categoria
  filterByCategory: async (category: string) => {
    const response = await fetch(`${BASE_URL}/filter.php?c=${category}`);
    return response.json();
  },

  // Filtrar por ingrediente
  filterByIngredient: async (ingredient: string) => {
    const response = await fetch(`${BASE_URL}/filter.php?i=${ingredient}`);
    return response.json();
  },

  // Filtrar por copo
  filterByGlass: async (glass: string) => {
    const response = await fetch(`${BASE_URL}/filter.php?g=${glass}`);
    return response.json();
  },

  // Obter detalhes completos de um drink
  getDrinkDetails: async (id: string) => {
    const response = await fetch(`${BASE_URL}/lookup.php?i=${id}`);
    return response.json();
  },

  // Drink aleatório
  getRandomDrink: async () => {
    const response = await fetch(`${BASE_URL}/random.php`);
    return response.json();
  },
};
