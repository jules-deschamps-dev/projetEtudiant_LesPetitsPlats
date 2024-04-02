import HomeTemplate from "../Templates/HomeTemplate.js";
import CardTemplate from "../Templates/Components/CardTemplate.js";
import FilterTemplate from "../Templates/Components/FiltersTemplate.js";
import DataService from './DataService.js';

class RecipeServices
{
  /**
   * Recherche une recette a partir de la saisie utilisateur
   * @param {string} string 
   * @param {Array} recipes 
   */
  static searchRecipe(search) {
    // si le nombre de caractères esst supérieur ou égal à trois on lance la recherche
    if (search.length >= 3 )
    {
      // mise à jour de l'attribut de recherche
      HomeTemplate.SearchString = search;
      const recipes = HomeTemplate.AllRecipes;
  
      const searchedRecipes = [];
      recipes.forEach(recipe => {
        if (
          recipe.name.toLowerCase().includes(search.toLowerCase()) || 
          recipe.description.toLowerCase().includes(search.toLowerCase()) ||
          recipe.ingredients.map(ingredient => ingredient.ingredient).join(", ").includes(search.toLowerCase())
        ) searchedRecipes.push(recipe);
      });
  
      //  mise à jour de l'attribut des recettes recherchées
      HomeTemplate.SearchedRecipes = searchedRecipes;
    }
  
    // sinon on définie ne cherche pas et on ne prend pas en compte le string
    else HomeTemplate.SearchString = "";
  
    // rechargement des recettes
    this.ReloadRecipes();
  }





  /**
   * Gestion de la recherche par tags
   * @param {Array} selectedTags Liste des tags selectionné
   * @param {Array} recipes Liste des recettes où les filtres doivent opérer
   * @returns 
   */
  static findByTags(selectedTags, recipes){
    //recipes = (recipes.length <= 0) ? HomeTemplate.AllRecipes : recipes;
    recipes = HomeTemplate.AllRecipes;
    const filterRecipes = [];
    recipes.forEach(recipe => {

      // récupère tout les tags d'une recette
      let tagsRecipe = [];
      tagsRecipe += recipe.ingredients.flatMap(element => element.ingredient.toLowerCase());
      tagsRecipe += recipe.ustensils.map(element => element.toLowerCase());
      tagsRecipe += recipe.appliance.toLowerCase();

      // renvoi true si il y a dans la recette TOUT les ingredients qui ont été selectionné
      const isInclude = selectedTags.every(element => tagsRecipe.includes(element.toLowerCase()));

      // ajout la recette à output
      if (isInclude) filterRecipes.push(recipe);
    });

    HomeTemplate.FilterRecipes = filterRecipes;

    return filterRecipes;
  }




  /**
  * Recharge une liste de recette
  * @param {*} recipes 
  */
  static ReloadRecipes()
  {
    // recupère les listes des recettes filtrées et recherchées
    const filterRecipe = HomeTemplate.FilterRecipes ?? [];
    const searchedRecipes = HomeTemplate.SearchedRecipes ?? [];
    const tagsActifs = HomeTemplate.SelectedTags;
    const searchString = HomeTemplate.SearchString;
    let recipes;

    // cas où la recherche est active, des tags sont ils selectionnés ?
    if (searchString != "") recipes = (tagsActifs.length <= 0) ? searchedRecipes : filterRecipe.filter(value => searchedRecipes.includes(value));
    
    // cas où la recherche est vide,  des tags sont ils selectionnés ?
    else recipes = (tagsActifs.length <= 0) ? HomeTemplate.AllRecipes : filterRecipe;
    
    // rechargement de la liste de tags
    this.ReloadTags(recipes);
  
    // rechargement du html
    this.ReloadHtml(recipes);

    return recipes;
  }




  /**
   * Recharge les tags dans leurs listes respectives
   * @param {*} recipes Recette affichées
   */
  static ReloadTags(recipes)
  {
    const selectedTags = HomeTemplate.SelectedTags;
    
    // récupération des tags encore disponibles dans les recettes
    let ingredientsTagsAvailable = DataService.getIngredients(recipes);
    let ustensilsTagsAvailable = DataService.getUstensils(recipes);
    let appliancesTagsAvailable = DataService.getAppliance(recipes);
    
    // suppression de ceux qui ont déjà était selectionné
    ingredientsTagsAvailable = ingredientsTagsAvailable.filter(tag => !selectedTags.includes(tag));
    ustensilsTagsAvailable = ustensilsTagsAvailable.filter(tag => !selectedTags.includes(tag));
    appliancesTagsAvailable = appliancesTagsAvailable.filter(tag => !selectedTags.includes(tag));

    // regénération des selects
    FilterTemplate.GenerateTagsSelector("ingredients", ingredientsTagsAvailable);
    FilterTemplate.GenerateTagsSelector("ustensils", ustensilsTagsAvailable);
    FilterTemplate.GenerateTagsSelector("appliances", appliancesTagsAvailable);
  }


  /**
   * Recharge la liste de recettes dans la page
   * @param {Array} recipes recettes à charger
   */
  static ReloadHtml(recipes)
  {
    document.querySelector("#cards-container").innerHTML = "";
    const cardsContainer = document.querySelector("#cards-container");

    // Si des recettes sont trouvées
    if (recipes.length > 0 )
    {
      recipes.forEach(recipe => {
        CardTemplate.Init(recipe, cardsContainer);
      });
    }

    // si aucun resultat
    else cardsContainer.textContent = "Aucun résultat"

    // mise à jour du compteur de recettes
    document.querySelector("#counter-container").textContent = recipes.length + " RECETTES";
  }
}

export default RecipeServices;