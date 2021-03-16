interface Logger {
  log(): string
}

export class FileLogger implements Logger {
  log(): string {
    return 'FileLogger'
  }
}

export class DatabaseLogger implements Logger {
  log(): string {
    return 'DatabaseLogger'
  }
}

interface LoggerFactory {
  create(type: string): Logger
}

export const LoggerFactory = new (class implements LoggerFactory {
  create(type: string): Logger {
    switch (type) {
      case 'file':
        return new FileLogger()
      case 'database':
        return new DatabaseLogger()
      default:
        throw new Error(`Logger type unknown: ${type}`)
    }
  }
})()
