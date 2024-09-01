
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

function saveToSession(key: string, value: any) {
  sessionStorage[key] = JSON.stringify(value);
}

function loadFromSession(key: string, defaultValue: any = null) {
  var value = sessionStorage[key] || defaultValue;
  return JSON.parse(value);
}
export const storageService = {
  store,
  load,
  saveToSession,
  loadFromSession
}
