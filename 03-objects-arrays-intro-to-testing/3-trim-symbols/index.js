/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {
  if (size === undefined) {
    return string;
  }

  if (size === 0) {
    return "";
  }

  let transformedString = "";
  const symbolsCollection = string.split("");

  for (let symb of symbolsCollection) {
    if (!transformedString.endsWith(symb.repeat(size))) {
      transformedString += symb;
    }
  }

  return transformedString;
}
