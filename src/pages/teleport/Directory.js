import Table from "../../components/table/Table.js";
import { directory } from "../../data/directory.js";
import { Link, useRouteMatch } from "react-router-dom";

function Directory({ data }) {
  console.log("data", data);
  let { url } = useRouteMatch();

  let entry = directory.name;

  const listItems = directory?.items?.map((val, idx) => {
    console.log("i", idx, "val", val.name);

    return (
      <li key={idx}>
        <Link to={`${url}/${val.name}`}>{val.name}</Link>
      </li>
    );
  });

  return (
    <div>
      <h3>{entry}</h3>

      <ul>{listItems}</ul>
    </div>
  );
}

export default Directory;
