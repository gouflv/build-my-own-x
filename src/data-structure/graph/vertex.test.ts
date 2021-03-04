import { Vertex } from './vertex'
import { Edge } from './edge'

describe('Test Graph Vertex', () => {
  let vertex: Vertex
  beforeEach(() => {
    vertex = new Vertex(0)
  })

  it('should create vertex', () => {
    expect(vertex.value).toBe(0)
    expect(vertex.getEdges()).toStrictEqual([])
  })

  it('should add and remove edge', () => {
    const edgeA = new Edge(vertex, new Vertex(1))

    vertex.addEdge(edgeA)
    expect(vertex.hasEdge(edgeA)).toBeTruthy()
    expect(vertex.getEdges()[0].toString()).toBe('0_1')

    vertex.removeEdge(edgeA)
    expect(vertex.hasEdge(edgeA)).not.toBeTruthy()
  })

  it('should getNeighborEdge works', () => {
    const vertex1 = new Vertex(1)
    const edgeA = new Edge(vertex, vertex1)

    vertex.addEdge(edgeA)
    expect(vertex.getNeighborEdge(vertex1)).toBe(edgeA)
    expect(vertex.hasNeighbor(vertex1)).toBeTruthy()
  })

  it('should getNeighbors works', () => {
    const vertex1 = new Vertex(1)
    const vertex2 = new Vertex(2)
    const edgeA = new Edge(vertex, vertex1)
    const edgeB = new Edge(vertex, vertex2)

    expect(vertex.getNeighbors()).toStrictEqual([])
    vertex.addEdge(edgeA)
    vertex.addEdge(edgeB)

    const neighbors = vertex.getNeighbors()
    expect(neighbors.length).toBe(2)
    expect(neighbors[0]).toEqual(vertex1)
    expect(neighbors[1]).toEqual(vertex2)
  })
})
