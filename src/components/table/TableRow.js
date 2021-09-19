import { Link } from "react-router-dom";

function TableRow({ type, name, size, items, location }) {
  let nameValue;
  if (type === "dir") {
    nameValue = (
      <div>
        <Link to={`${location.pathname}/${name}`}>{name}</Link>
      </div>
    );
  } else {
    nameValue = name;
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
