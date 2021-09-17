import { Link, useRouteMatch, Switch, Route } from "react-router-dom";
import DataFinder from "../DataFinder.js"

function TableRow({ type, name, size, items }) {
  let { url } = useRouteMatch()
  console.log("row", type, name, size, items)
  console.log(url)

  let nameValue;
  if (type === "dir") {
    console.log("tablerow", url)
    if (url.startsWith("/teleport")) {
      nameValue =  (
        <div>
          <Link to={`${url}/${name}`}>{name}</Link>
        </div>
      )
    } else {
      nameValue =  (
        <div>
          <Link to={`${url}${name}`}>{name}</Link>
        </div>
      )
    }
  } else {
    nameValue = name
  }

  return (
    <tr>
      <td>{type}</td>
      <td>{nameValue}</td>
      <td>{size}</td>
    </tr>
  );
}

export default TableRow;
