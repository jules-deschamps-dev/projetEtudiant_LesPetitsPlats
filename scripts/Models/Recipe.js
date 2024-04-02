class Recipe{
  id;
  image;
  name;
  servings;
  ingredients;
  time;
  description;
  appliance;
  ustensils;

  constructor(recipeInformations) {
    this.id = recipeInformations.id
    this.image = recipeInformations.image
    this.name = recipeInformations.name
    this.servings = recipeInformations.servings
    this.ingredients = recipeInformations.ingredients
    this.time = recipeInformations.time
    this.description = recipeInformations.description
    this.appliance = recipeInformations.appliance
    this.ustensils = recipeInformations.ustensils
  }
}

export default Recipe;