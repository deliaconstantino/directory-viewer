import Table from "../../components/table/Table.js";
import { directory } from "../../data/directory.js";
import { Link, useRouteMatch } from "react-router-dom";

function Page({ data }) {
  console.log("data", data);
  let { url } = useRouteMatch();

  const listItems = directory?.items?.map((val, idx) => {
    console.log("i", idx, "current value", val);

    return (
      <li key={idx}>
        <Link to={`${url}/${val.name}`}>{val.name}</Link>
      </li>
    );
  });

  return (
    <div>
      <ul>{listItems}</ul>
    </div>
  );
}

export default Page;
