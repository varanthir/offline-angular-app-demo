const types = new Set<string>()

export function checkType(type: string): void {
  if (types.has(type)) {
    throw new Error(`Action '${type}' already exists!`)
  }

  types.add(type)
}

export function checkTypes(actionTypes: { [actionTypeKey: string]: string }): void {
  Object.values(actionTypes).forEach(checkType)
}
