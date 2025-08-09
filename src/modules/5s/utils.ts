export const toDuration = (startDate: Date, endDate: Date = new Date()) => {
  const diffMs = endDate.getTime() - startDate.getTime()

  if (diffMs < 0) {
    return null
  }

  const seconds = Math.floor(diffMs / 1000) % 60
  const minutes = Math.floor(diffMs / (1000 * 60)) % 60
  const hours = Math.floor(diffMs / (1000 * 60 * 60))

  const parts = []

  if (hours > 0) {
    parts.push(`${hours}h`)
  }
  if (minutes > 0) {
    parts.push(`${minutes}m`)
  }

  parts.push(`${seconds}s`.padStart(3, '0'))

  return parts.join(' ')
}
