type EventMap = {
  wallet_updated: { walletId: string; balance: number }
  transaction_added: { transactionId: string; walletId: string }
}

type Handler<K extends keyof EventMap> = (payload: EventMap[K]) => void

class EventBus {
  private handlers: { [K in keyof EventMap]?: Handler<K>[] } = {}

  on<K extends keyof EventMap>(event: K, handler: Handler<K>) {
    const arr = (this.handlers[event] ??= []) as Handler<K>[]
    arr.push(handler)
    return () => this.off(event, handler)
  }

  off<K extends keyof EventMap>(event: K, handler: Handler<K>) {
    const arr = (this.handlers[event] ??= []) as Handler<K>[]
    const idx = arr.indexOf(handler)
    if (idx >= 0) arr.splice(idx, 1)
  }

  emit<K extends keyof EventMap>(event: K, payload: EventMap[K]) {
    const arr = (this.handlers[event] ??= []) as Handler<K>[]
    arr.forEach((h) => h(payload))
  }
}

export const eventBus = new EventBus()
