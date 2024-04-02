class DataService
{
  /**
  * Récupère la liste des recettes
  * @returns {Array} Liste des recettes
  */
  static async GetRecipes() 
  {
    const response = await fetch("./data/recipes.json");
    const { recipes } = await response.json();
    
    return recipes;
  }


  /**
  * Récupère tout les ingrédients
  * @param {Array} recipes 
  * @returns 
  */
  static getIngredients(recipes) 
  {
    let ingredients = recipes.flatMap(recipe => recipe.ingredients.map(ingredient => ingredient.ingredient.toLowerCase()));
    ingredients = new Set(ingredients);

    return [...ingredients];
  }


  /**
  * Récupère la liste des ustensilles
  * @param {Array} recipes 
  * @returns 
  */
  static getUstensils(recipes) 
  {
    let ustensils = [];
    recipes.map(element => ustensils = ustensils.concat(element.ustensils));
    ustensils = ustensils.map(element => element.toLowerCase())
    ustensils = new Set(ustensils);
    
    return [...ustensils];
  }


  /**
  * Récupère la liste des appareils
  * @param {Array} recipes 
  * @returns 
  */
  static getAppliance(recipes) 
  {
    let appliances = [];
    recipes.map(element => appliances.push(element.appliance.toLowerCase()));
    appliances = new Set(appliances);
    
    return [...appliances];
  }
}

export default DataService;