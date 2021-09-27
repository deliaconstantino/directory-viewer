import { Link } from "react-router-dom";
import FileIcon from "../icons/FileIcon";
import FolderIcon from "../icons/FolderIcon";

function TableRow({ type, name, size, location }) {
  let nameValue;
  let $imageSVG;

  const urlValue =
    location.pathname === "/" ? name : `${location.pathname}/${name}`;

  if (type === "dir") {
    nameValue = (
      <Link className="text-blue-500 underline" to={urlValue}>
        {name}
      </Link>
    );
    $imageSVG = <FolderIcon />;
  } else {
    nameValue = name;
    $imageSVG = <FileIcon />;
  }

  return (
    <tr data-testid="tableRow">
      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
        {$imageSVG} <span data-testid="nameValue">{nameValue}</span>
      </td>
      <td
        data-testid="sizeValue"
        className="px-6 py-4 whitespace-no-wrap border-b border-gray-200"
      >
        {size ? size : "-"}
      </td>
    </tr>
  );
}

export default TableRow;
