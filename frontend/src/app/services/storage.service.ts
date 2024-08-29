
function store(key: string, value: {
  name: string
  value: number
}[]) {
  localStorage[key] = JSON.stringify(value)
}

function load(key: string, defaultValue = null) {
  var value = localStorage[key] || defaultValue
  return JSON.parse(value)
}
export const storageService = {
  store,
  load
}
