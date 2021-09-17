import Table from "../../components/table/Table.js";
import { directory } from "../../data/directory.js";
import { Link, useRouteMatch } from "react-router-dom";

function Page({ data }) {
  console.log("data - page", data);
  let { url } = useRouteMatch();
  // const listItems = directory?.items?.map((val, idx) => {
  //   console.log("i", idx, "current value", val);

  //   return (
  //     <li key={idx}>
  //       <Link to={`${url}/${val.name}`}>{val.name}</Link>
  //     </li>
  //   );
  // });

  return (
    <div>
      <p>breadcrumbs - {url}</p>
      <p>search box here</p>
      <p>Top level teleport table will go here</p>
      {/* <ul>{listItems}</ul> */}
    </div>
  );
}

export default Page;
