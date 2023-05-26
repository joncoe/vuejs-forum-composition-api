export const findById = (resources, id) => {
  if (!resources) return null;
  return resources.find(resource => resource.id === id)
}

export const upsert = (resourceSet, resourceToAdd) => {
  const index = resourceSet.findIndex(res => res.id === resourceToAdd.id);
  if (resourceToAdd.id && index !== -1) {
    resourceSet[index] = resourceToAdd;
  } else {
    resourceSet.push(resourceToAdd) // append the resource to the set
  }
}

export const docToResource = (doc) => {
  if (typeof doc?.data !== 'function') return  doc;
  return {
    ...doc.data(),
    id: doc.id
  }
}

export const makeAppendChildToParentMutation = ({ parent, child }) => {
  return (state, { childId, parentId }) => {
    const resource = findById(state.items, parentId)
    if (!resource) {
      console.warn(`Appending ${child} ${childId} to ${parent} ${parentId} failed because the parent didn't exist`)
      return
    }
    resource[child] = resource[child] || []

    if (!resource[child].includes(childId)) {
      resource[child].push(childId)
    }
  }
}
