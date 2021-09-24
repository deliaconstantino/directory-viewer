import { directory } from "../data/directory";

export function findDirectory(urlArray) {
  let parentLevel = directory;

  if (urlArray.length === 0) return [[parentLevel], true];
  if (parentLevel.name !== urlArray[0]) return [[], false];

  parentLevel = parentLevel.items;

  if (urlArray.length === 1) return [parentLevel, true];

  for (let i = 1; i < urlArray.length; i++) {
    const foundIdx = parentLevel.findIndex((val) => val.name === urlArray[i]);

    if (foundIdx <= -1) return [[], false];

    parentLevel = parentLevel[foundIdx].items;
  }

  return [parentLevel, true];
}
