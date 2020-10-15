/**
 * createGetter - creates function getter which allows select value from object
 * @param {string} path - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */
export function createGetter(path) {
  const partsOfPath = path.split(".");

  return (checkingObject) => {
    let searchingProperty = checkingObject;

    const getSearchingProperty = (pathsArray) => {
      let pathsArrayCopy = pathsArray;

      if (!pathsArrayCopy.length || !searchingProperty) {
        return searchingProperty;
      }

      const [nearPath, ...lastPaths] = pathsArrayCopy;

      searchingProperty = searchingProperty[nearPath];

      return getSearchingProperty(lastPaths);
    };

    return getSearchingProperty(partsOfPath);
  };
}
