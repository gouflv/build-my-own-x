interface ThemeLightComponent {
  name(): string
}

interface ThemeDarkComponent {
  name(): string
}

export class LightButton implements ThemeLightComponent {
  name(): string {
    return 'LightButton'
  }
}

export class DarkButton implements ThemeDarkComponent {
  name(): string {
    return 'DarkButton'
  }
}

interface ThemeLightComponentFactory {
  create(type: string): ThemeLightComponent
}

interface ThemeDarkComponentFactory {
  create(type: string): ThemeDarkComponent
}

export const ThemeLightComponentFactory = new (class
  implements ThemeLightComponentFactory {
  create(type: string): ThemeLightComponent {
    switch (type) {
      case 'button':
        return new LightButton()
      default:
        throw new Error(`Logger type unknown: ${type}`)
    }
  }
})()

export const ThemeDarkComponentFactory = new (class
  implements ThemeDarkComponentFactory {
  create(type: string): ThemeDarkComponent {
    switch (type) {
      case 'button':
        return new DarkButton()
      default:
        throw new Error(`Logger type unknown: ${type}`)
    }
  }
})()
