class Ingredient {
  ingredient;
  quantity;
  unit;

  constructor(ingredient, quantity = null, unit = "") {
    this.ingredient = ingredient;
    this.quantity = quantity;
    this.unit = unit;
  }
}