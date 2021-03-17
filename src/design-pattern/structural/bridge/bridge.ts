// Implementation
interface Engine {
  start()
}

// Concrete Implementations
export class HybridEngine implements Engine {
  start() {
    return 'HybridEngine start'
  }
}

// Abstraction
abstract class Car {
  constructor(protected engine: Engine) {}
  abstract drive(): string
  abstract getBrand(): string
}

// Refined Abstraction
abstract class RefinedCar extends Car {
  constructor(engine: Engine) {
    super(engine)
  }
  drive() {
    return this.engine.start()
  }
}

export class BossCar extends RefinedCar {
  getBrand(): string {
    return 'BossCar'
  }
}
