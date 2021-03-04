import { LinkedList } from '../linked-list/linked-list'
import { Edge } from './edge'

export class Vertex<T = number> {
  private edges = new LinkedList<Edge<T>>([], (a, b) => {
    return a.getKey() === b.getKey()
  })

  constructor(public value: T) {}

  addEdge(edge: Edge<T>) {
    this.edges.append(edge)
  }

  removeEdge(edge: Edge<T>) {
    this.edges.remove(edge)
  }

  hasEdge(edge: Edge<T>) {
    return !!~this.edges.indexOf(edge)
  }

  getEdges() {
    return this.edges.toArray()
  }

  getDegree() {
    return this.edges.toArray().length
  }

  getNeighborEdge(vertex: Vertex<T>): Edge<T> | null {
    const node = this.edges.find(
      edges => edges.startVertex === vertex || edges.endVertex === vertex
    )
    return node ? node.value : null
  }

  hasNeighbor(vertex: Vertex<T>) {
    return !!this.getNeighborEdge(vertex)
  }

  getNeighbors() {
    return this.edges.toArray().map(edge => {
      return edge.startVertex !== this ? edge.startVertex : edge.endVertex
    })
  }
}
