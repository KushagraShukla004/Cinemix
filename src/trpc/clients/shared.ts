//took it from a t3 stack variation for easy dynamic url portability for production and development urls

function getBaseUrl() {
  if (typeof window !== 'undefined') return ''
  if (process.env.RAILWAY_URL) return `https://${process.env.RAILWAY_URL}`
  return `http://localhost:${process.env.PORT ?? 3000}`
}
console.log('getBaseUrl(): ', getBaseUrl())
export function getUrl() {
  return getBaseUrl() + '/api/trpc'
}
