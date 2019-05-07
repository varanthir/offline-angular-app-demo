const types = new Set<string>()

export function checkTypes(actionTypes: { [actionTypeKey: string]: string }): void {
  Object.keys(actionTypes).forEach(actionTypeKey => {
    const actionType = actionTypes[actionTypeKey]
    console.log(`${actionTypeKey}: ${actionType}`)

    if (types.has(actionType)) {
      throw new Error(`Action '${actionType}' already exists!`)
    }

    types.add(actionType)
  })
}
