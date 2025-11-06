const ALPHABET = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz-'

export function nanoid(size = 12): string {
  let id = ''
  const cryptoObj = globalThis.crypto || (globalThis as any).msCrypto
  const bytes = new Uint8Array(size)
  if (cryptoObj?.getRandomValues) {
    cryptoObj.getRandomValues(bytes)
    for (let i = 0; i < size; i++) id += ALPHABET[bytes[i] & 63]
    return id
  }
  // fallback
  for (let i = 0; i < size; i++) id += ALPHABET[(Math.random() * 64) | 0]
  return id
}
