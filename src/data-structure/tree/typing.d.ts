export interface Node<T> {
  value: T
  left: NullableNode<T>
  right: NullableNode<T>
}

export type NullableNode<T> = Node<T> | null
