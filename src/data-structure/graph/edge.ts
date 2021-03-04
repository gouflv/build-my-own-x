import { Vertex } from './vertex'

export class Edge<T> {
  constructor(
    public startVertex: Vertex<T>,
    public endVertex: Vertex<T>,
    public weight = 0
  ) {}

  getKey() {
    return `${this.startVertex.value}_${this.endVertex.value}`
  }

  toString() {
    return this.getKey()
  }
}
