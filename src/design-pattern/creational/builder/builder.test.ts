import { MealBuilder } from './builder'

describe('Test Builder', () => {
  it('should create Logger', () => {
    const builder = new MealBuilder()
    const meal = builder.create()
    expect(meal).toStrictEqual({
      name: 'Meal',
      food: 'Hamburger',
      drink: 'Coffee'
    })
  })
})
