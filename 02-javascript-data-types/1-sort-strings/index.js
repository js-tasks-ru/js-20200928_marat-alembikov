/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */

function compareStrings(firstString, secondString) {
  return firstString.localeCompare(secondString, ["ru", "en"], {
    caseFirst: "upper",
  });
}

export function sortStrings(arr, param = "asc") {
  return [...arr].sort((firstString, secondString) => {
    switch (param) {
    case "asc":
      return compareStrings(firstString, secondString);

    case "desc":
      return compareStrings(secondString, firstString);

      // no default
    }
  });
}
