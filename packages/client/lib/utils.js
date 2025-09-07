import loget from 'lodash/get'

export function replacePlaceholders(template, data) {
  return template.replace(/{([^}]+)}/g, (match, path) => {
    // Use _.get to retrieve the value from the data object.
    // If the path is not found, it returns the original match (e.g., "{claim.identifier}").
    return loget(data, path, match)
  })
}