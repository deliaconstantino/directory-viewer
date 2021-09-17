import Table from "../../components/table/Table.js";
import BreadCrumbs from "./components/BreadCrumbs.js";
import { directory } from "../../data/directory.js";
import { Link, useRouteMatch } from "react-router-dom";

function Page({ data }) {
  console.log("data - page", data);

  //render a table on the page, each table row = a directory

  return (
    <div>
      <BreadCrumbs />
      <p>search box here</p>
      <p>Top level teleport table will go here</p>

      <Table data={data} />
    </div>
  );
}

export default Page;
