import { useEffect, useState } from "react";
import { directory } from "../data/directory.js";
import { Link, useRouteMatch } from "react-router-dom";
import Page from "../pages/page/Page.js";

function searchDirectory(urlArray) {
  //TODO: add check that this value exists in this directory
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
  const [data, setData] = useState(null);

  let { url } = useRouteMatch();
  let filteredUrl = url.split("/").filter(Boolean);

  useEffect(() => {
    setData(searchDirectory(filteredUrl));
  }, [data]);

  // console.log("type", data?.type);
  return (
    <div>
      <Page data={data} />
    </div>
  );
}

export default DataFinder;
