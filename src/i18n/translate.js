export function translate(dictionary, language, path) {
  const keys = String(path || '').split('.')
  let value = dictionary[language]

  for (const key of keys) {
    if (value && typeof value === 'object' && key in value) {
      value = value[key]
    } else {
      return path
    }
  }

  return typeof value === 'string' ? value : path
}
