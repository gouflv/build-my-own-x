interface ThemedComponent {
  name(): string
}

export class LightButton implements ThemedComponent {
  name(): string {
    return 'LightButton'
  }
}

export class DarkButton implements ThemedComponent {
  name(): string {
    return 'DarkButton'
  }
}

interface ThemedComponentFactory {
  create(type: string): ThemedComponent
}

export const ThemeLightComponentFactory = new (class
  implements ThemedComponentFactory {
  create(type: string): ThemedComponent {
    switch (type) {
      case 'button':
        return new LightButton()
      default:
        throw new Error(`Logger type unknown: ${type}`)
    }
  }
})()

export const ThemeDarkComponentFactory = new (class
  implements ThemedComponentFactory {
  create(type: string): ThemedComponent {
    switch (type) {
      case 'button':
        return new DarkButton()
      default:
        throw new Error(`Logger type unknown: ${type}`)
    }
  }
})()
