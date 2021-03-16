import { ThemeDarkComponentFactory, ThemeLightComponentFactory } from './index'

describe('Test AbstractFactory', () => {
  it('should create light Button', () => {
    expect(ThemeLightComponentFactory.create('button').name()).toBe(
      'LightButton'
    )
  })

  it('should create dark Button', () => {
    expect(ThemeDarkComponentFactory.create('button').name()).toBe('DarkButton')
  })
})
