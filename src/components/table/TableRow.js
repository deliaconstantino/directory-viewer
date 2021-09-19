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
      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{type}</td>
      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{nameValue}</td>
      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{size}</td>
    </tr>
  );
}

export default TableRow;
