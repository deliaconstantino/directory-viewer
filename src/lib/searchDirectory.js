import { directory } from "../data/directory";

export function searchDirectory(urlArray) {
  // console.log({urlArray})
  let parentLevel = directory;

  if (urlArray.length === 0) {
    // return parentLevel;
    return [parentLevel];
  }

  if (parentLevel.name !== urlArray[0]) return false;
  parentLevel = parentLevel.items;

  if (urlArray.length === 1) {
    return parentLevel;
  }

  for (let i = 1; i < urlArray.length; i++) {
    const foundIdx = parentLevel.findIndex((val) => val.name === urlArray[i]);

    if (foundIdx > -1) {
      parentLevel = parentLevel[foundIdx].items;
    } else {
      return false;
    }
  }

  return parentLevel;
}
