type Nullable<T> = T | null

interface Handler {
  setNext(handler: Handler): Handler
  handle(request: string): string
}

export abstract class AbstractHandler implements Handler {
  next: Nullable<Handler> = null
  setNext(next: Handler): Handler {
    this.next = next
    return next
  }
  handle(request: string): string {
    if (!this.next) {
      return request
    }
    return this.next.handle(request)
  }
}
