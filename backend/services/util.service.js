module.exports = {
  getRandomInt,
  makeId,
  getDateISO
}

// Generates a random integer between min (inclusive) and max (exclusive)
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

// Creates a random string of the specified length (default is 5) using letters and numbers
function makeId(length = 5) {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let txt = '';
  for (let i = 0; i < length; i++) {
      txt += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return txt;
}

// Returns the current date and time in ISO 8601 format
function getDateISO() {
  const date = new Date();
  return date.toISOString();
}
