export function sortBy(data, sortDirection, keyName, caseInsensitive) {
  const sortedArr = [...data];

  return sortedArr.sort((a, b) => {
    const elementA = caseInsensitive ? a[keyName].toUpperCase() : a[keyName];
    const elementB = caseInsensitive ? b[keyName].toUpperCase() : b[keyName];

    if (sortDirection === "up") {
      return elementA < elementB ? -1 : elementA > elementB ? 1 : 0;
    } else {
      return elementA > elementB ? -1 : elementA < elementB ? 1 : 0;
    }
  });
}
