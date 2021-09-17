import { useEffect, useState } from "react";
import { directory } from "../data/directory.js";
import { Link, useRouteMatch } from "react-router-dom";
import Page from "../pages/page/Page.js";

function searchDirectory(urlArray) {
  //TODO: add check that this value exists in this directory
  let parentLevel = directory;
  console.log(urlArray);

  if (urlArray.length === 0) {
    return parentLevel;
  }

  if (urlArray.length === 1) {
    console.log("ua", urlArray[0]);
    parentLevel = parentLevel.items;
    console.log("parentLevel", parentLevel);
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

  let tableData = new Array();
  if (data && data.length) {
    tableData = data;
  } else {
    tableData.push(data);
  }

  return (
    <div>
      <Page data={tableData} />
    </div>
  );
}

export default DataFinder;
