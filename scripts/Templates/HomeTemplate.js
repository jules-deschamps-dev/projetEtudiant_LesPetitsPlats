import Helpers from "../Helpers/Helper.js";
import RecipeServices from "../Services/RecipeServices.js";

class HomeTemplate {
  constructor(recipes)
  {
    // définie les variables de classe
    HomeTemplate.AllRecipes = recipes;
    HomeTemplate.FilterRecipes = [];
    HomeTemplate.SearchedRecipes = [];
    HomeTemplate.SelectedTags = [];
    HomeTemplate.SearchString = "";
    
    // creation de la page 
    HomeTemplate.Header();
    HomeTemplate.Main();
  }

  /**
   * Génère le Header de la page
   */
  static Header(){
    const header = Helpers.HTMLElement("header", {}, "", document.querySelector("#app"));
    Helpers.HTMLElement("h1", {}, "cherchez parmi plus de 1500 recettes du quotidien, simples et délicieuses", header);
    const form = Helpers.HTMLElement("form", {}, null, header);
    const input = Helpers.HTMLElement("input", { type : "text" }, null, form);
    input.addEventListener('keyup', (element) => RecipeServices.searchRecipe(element.target.value));
  }

  /**
   * Génère le Main de la page
   */
  static Main(){
    const main = Helpers.HTMLElement("main", {}, null, document.querySelector("#app"));
    const filterContainer = Helpers.HTMLElement("div", {id : "filters-container"}, null, main);
    const tagsContainer = Helpers.HTMLElement("div", {id : "tags-container", class: "flex justify-between"}, null, filterContainer);
    const selectContainer = Helpers.HTMLElement("div", {id : "select-container"}, null, tagsContainer);
    const counterContainer = Helpers.HTMLElement("div", {id : "counter-container", class: "flex"}, null, tagsContainer);
    Helpers.HTMLElement("div", {id : "select-container"}, null, main);
    Helpers.HTMLElement("div", {id : "chips-container"}, null, filterContainer);

    //ancres html
    const ingredientListAnchors = Helpers.HTMLElement("div", {class : "list-anchors"}, null, selectContainer);
    const ustensilsListAnchors = Helpers.HTMLElement("div", {class : "list-anchors"}, null, selectContainer);
    const appliancesListAnchors = Helpers.HTMLElement("div", {class : "list-anchors"}, null, selectContainer);

    // liste des tags
    Helpers.HTMLElement("ul", {id : "ingredients-list"}, null, ingredientListAnchors);
    Helpers.HTMLElement("ul", {id : "ustensils-list"}, null, ustensilsListAnchors);
    Helpers.HTMLElement("ul", {id : "appliances-list"}, null, appliancesListAnchors);

    Helpers.HTMLElement("section", {id : "cards-container"}, null, main);

    RecipeServices.ReloadRecipes();
  }

  
}

export default HomeTemplate;