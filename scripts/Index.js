
import DataService from './Services/DataService.js';
import HomeTemplate from './Templates/HomeTemplate.js'

class Index{
  static async Init() 
  {
    const recipes = await DataService.GetRecipes();
    
    new HomeTemplate(recipes);
  }
}

Index.Init();