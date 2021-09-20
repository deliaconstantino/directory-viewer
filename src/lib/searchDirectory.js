import { directory } from "../data/directory.js";

export function searchDirectory(urlArray) {
  let parentLevel = directory;
  if (urlArray.length === 1) {
    return parentLevel;
  }

  if (parentLevel.name !== urlArray[1]) return false;
  parentLevel = parentLevel.items;

  if (urlArray.length === 2) {
    return parentLevel;
  }

  for (let i = 2; i < urlArray.length; i++) {
    const foundIdx = parentLevel.findIndex((val) => val.name === urlArray[i]);

    if (foundIdx > -1) {
      parentLevel = parentLevel[foundIdx].items;
    } else {
      return false;
    }
  }

  return parentLevel;
}
