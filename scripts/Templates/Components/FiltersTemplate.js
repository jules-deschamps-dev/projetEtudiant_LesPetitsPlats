import Helpers from "../../Helpers/Helper.js";
import RecipeServices from "../../Services/RecipeServices.js";
import HomeTemplate from "../HomeTemplate.js";
import ChipsTemplate from "./ChipsTemplate.js";


class FilterTemplate {
  /**
   * Génére un select
   * @param {string} tagName nom du tag (ingrendient, ustensils, appliance)
   * @param {array} tags liste d'un tagName
   */
  static GenerateTagsSelector(tagName, tags){
    // récupère la liste de tout les tags selectionné et les tries pas ordre alphabétique
    let selectedTags = HomeTemplate.SelectedTags;

    // trie les tags par ordre alphabétique
    tags.sort();

    // selectionne la liste html du tag et la vide
    let select = document.querySelector(`#select-container ul#${tagName}-list`);
    select.innerHTML = "";

    // génère le titre du select
    this.TitleOfSelect(tagName, select)

    
    for (let i = 0; i < tags.length; i++)
    {
      const ingredientElement = Helpers.HTMLElement("li", {title : tags[i]}, tags[i], select);
      ingredientElement.addEventListener("click", () => {
        // retire les tags clické
        tags.splice(tags.indexOf(tags[i]), 1); 

        // ajoute le tags à la liste des selectionnés
        selectedTags.push(tags[i]);

        // récupère la liste des recettes filtrée
        HomeTemplate.FilterRecipes = RecipeServices.findByTags(selectedTags, HomeTemplate.ActualsRecipes);

        // génère une chips et les events listener qui lui sont lié
        const chips = new ChipsTemplate(tags[i]); 
        chips.addEventListener("click", () => {

          // supprimer le tag de la liste des tags selectionné et le reajoute le tag à la liste des tags disponible
          selectedTags.splice(selectedTags.indexOf(chips.textContent), 1);
          tags.push(chips.textContent);
          
          // applique le filtre
          HomeTemplate.FilterRecipes = RecipeServices.findByTags(selectedTags, HomeTemplate.SearchedRecipes);
          HomeTemplate.SelectedTags = selectedTags;

          // recharge les recettes et les listes de tags
          RecipeServices.ReloadRecipes();

          // supprime la chips
          chips.remove();
        })

        // recharge la liste des recettes dans la page
        RecipeServices.ReloadRecipes(); 
      })
    }
  }


  /**
   * Génère un titre pour le select
   * @param {string} tagName nom du tag
   * @param {string} parent noeud html parent
   * @returns 
   */
  static TitleOfSelect(tagName, parent)
  {
    let output;
    if (tagName == "ingredients") output = Helpers.HTMLElement("span", {}, "Ingrédients", parent);
    else if (tagName == "ustensils") output = Helpers.HTMLElement("span", {}, "Ustensiles", parent);
    else if (tagName == "appliances") output = Helpers.HTMLElement("span", {}, "Appareils", parent);
    else output = Helpers.HTMLElement("span", {}, tagName, select);

    return output;
  }
}

export default FilterTemplate;