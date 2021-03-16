export class Singleton {
  name = 'Singleton'

  private static instance: Singleton | undefined

  private constructor() {}

  static getInstance() {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton()
    }
    return Singleton.instance
  }
}
