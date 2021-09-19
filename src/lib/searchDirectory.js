import { directory } from "../data/directory.js";

export function searchDirectory(urlArray) {
  //TODO: add check that this value exists in this directory
  let parentLevel = directory;

  if (urlArray.length === 1) {
    return parentLevel;
  }

  parentLevel = parentLevel.items;

  if (urlArray.length === 2) {
    return parentLevel;
  }

  for (let i = 2; i < urlArray.length; i++) {
    let foundIdx = parentLevel.findIndex((val) => val.name === urlArray[i]);
    parentLevel = parentLevel[foundIdx].items;
  }

  return parentLevel;
}
