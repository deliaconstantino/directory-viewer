import { directory } from "../data/directory.js";
import { Link, useRouteMatch } from "react-router-dom";
import Directory from "../pages/teleport/Directory.js";

function searchDirectory(urlArray) {
  //TODO: add check that this value exists in data
  let parentLevel = directory;

  if (urlArray.length === 1) {
    return parentLevel;
  }

  for (let i = 0; i < urlArray.length; i++) {
    let foundIdx = parentLevel.items.findIndex(
      (val) => val.name === urlArray[i]
    );
    parentLevel = parentLevel.items[foundIdx];
  }

  return parentLevel;
}

function DataFinder() {
  let { url } = useRouteMatch();
  let filteredUrl = url.split("/").filter(Boolean);
  console.log("u", filteredUrl);
  const parentData = searchDirectory(filteredUrl);
  console.log("parentData", parentData);
  return (
    <div>
      datafinder
      <Directory data={parentData} />
    </div>
  );
}

export default DataFinder;
