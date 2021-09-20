import { directory } from "../data/directory.js";

export function searchDirectory(urlArray) {
    //TODO: add check that this value exists in this directory
  // if (urlArray[0] !== "directory") return false;
  let parentLevel = directory;
  if (urlArray.length === 1) {
    return parentLevel;
  }

  if (parentLevel.name !== urlArray[1]) return false;
  parentLevel = parentLevel.items;

  if (urlArray.length === 2) {
    return parentLevel;
  }

  let foundIdx;
  for (let i = 2; i < urlArray.length; i++) {
    foundIdx = parentLevel.findIndex((val) => val.name === urlArray[i]);
    if (foundIdx > -1) parentLevel = parentLevel[foundIdx].items;
  }

  if (foundIdx === -1) return false;

  return parentLevel;
}
