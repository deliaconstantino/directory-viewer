export function sortBy(dataArr, sortDirection, keyName) {
  const sortedArr = dataArr.slice();

  if (sortDirection === "up") {
    if (keyName === "name") {
      sortedArr.sort(function (a, b) {
        const elementA = a.name.toUpperCase();
        const elementB = b.name.toUpperCase();
        return elementA < elementB ? -1 : elementA > elementB ? 1 : 0;
      });
    } else {
      sortedArr.sort(function (a, b) {
        const numberA = a.sizeKb;
        const numberB = b.sizeKb;
        return numberA < numberB ? -1 : numberA > numberB ? 1 : 0;
      });
    }
  } else {
    if (keyName === "name") {
      sortedArr.sort(function (a, b) {
        const elementA = a.name.toUpperCase();
        const elementB = b.name.toUpperCase();
        return elementA > elementB ? -1 : elementA < elementB ? 1 : 0;
      });
    } else {
      sortedArr.sort(function (a, b) {
        const numberA = a.sizeKb;
        const numberB = b.sizeKb;
        return numberA > numberB ? -1 : numberA < numberB ? 1 : 0;
      });
    }
  }

  return sortedArr;
}
