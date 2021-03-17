interface Meal {
  name: string
  food: string
  drink: string
}

interface IMealBuilder {
  create()
  buildFood()
  buildDrink()
}

export class MealBuilder implements IMealBuilder {
  create() {
    const meal = { name: 'Meal' } as Meal
    meal.food = this.buildFood()
    meal.drink = this.buildDrink()
    return meal
  }
  buildDrink() {
    return 'Coffee'
  }
  buildFood() {
    return 'Hamburger'
  }
}
