import { BossCar, HybridEngine } from './bridge'

describe('Test Bridge', () => {
  it('should it works', () => {
    const car = new BossCar(new HybridEngine())
    expect(car.getBrand()).toBe('BossCar')
    expect(car.drive()).toBe('HybridEngine start')
  })
})
