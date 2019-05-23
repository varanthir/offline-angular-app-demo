export const round = (value: number) =>
  Math.round(value * 100) / 100

export const toMemoryUnit = (bytes: number, roundF = round): string => {
  if (bytes < 1024) {
    return `${bytes} B`
  }
  if (bytes < 1024 ** 2 ) {
    return `${roundF(bytes / 1024)} KB`
  }
  if (bytes < 1024 ** 3 ) {
    return `${roundF(bytes / 1024 ** 2)} MB`
  }
  return `${roundF(bytes / 1024 ** 3)} GB`
}
