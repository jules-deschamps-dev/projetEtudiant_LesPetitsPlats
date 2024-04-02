import RecipeModel from "../../Models/Recipe.js";
import Helpers from "../../Helpers/Helper.js"

class CardTemplate {
  static Init(data, parent)
  {
    // Entité Recipe
    const recipe = new RecipeModel(data);

    // Template
    const card = Helpers.HTMLElement("div", {id : recipe.id, class : "card"}, null, parent);
    Helpers.HTMLElement("img", {src : `./data/img/Recette${recipe.id.toString().padStart(2, '0')}.jpg`, alt : `Recette de ${recipe.name}`}, null, card);
    
    const informations = Helpers.HTMLElement("div", {class : "informations"}, null, card);
    Helpers.HTMLElement("h3", {}, recipe.name, informations);
    
    Helpers.HTMLElement("span", {class : "title"}, "Recette", informations);
    Helpers.HTMLElement("p", {}, recipe.description, informations);

    Helpers.HTMLElement("span", {class : "title"}, "Ingredients", informations);
    const ingredientsContainer = Helpers.HTMLElement("div", {class : "ingredients-container"}, null, informations);
    recipe.ingredients.forEach(ingredient => {
      const ingredients = Helpers.HTMLElement("div", {class : "ingredients"}, null, ingredientsContainer);
      Helpers.HTMLElement("span", {class : "name"}, ingredient.ingredient, ingredients);
      Helpers.HTMLElement("span", {class : "value"}, ingredient.quantity + ingredient.unit, ingredients);
    });
    
  }
}

export default CardTemplate;