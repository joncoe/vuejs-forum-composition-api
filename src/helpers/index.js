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
    id: doc.ic
  }
}
