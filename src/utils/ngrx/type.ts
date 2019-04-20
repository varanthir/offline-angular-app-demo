const types = new Set<string>()

export function type(name: string): string {
  if (types.has(name)) {
    throw new Error(`Action '${name}' already exists!`)
  }

  types.add(name)
  return name
}
