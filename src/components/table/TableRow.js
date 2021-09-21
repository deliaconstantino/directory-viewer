import { Link } from "react-router-dom";

function TableRow({ type, name, size, location }) {
  console.log({ location });

  let nameValue;
  let imageSVG;
  const urlValue = (location.pathname === "/") ? name : `${location.pathname}/${name}`;
  if (type === "dir") {
    nameValue = (
      <div className="text-blue-500 underline">
        <Link to={urlValue}>{name}</Link>
      </div>
    );

    imageSVG = (
      <svg
        title="folderIcon"
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        fill="currentColor"
        className="bi bi-folder2"
        viewBox="0 0 16 16"
      >
        <path d="M1 3.5A1.5 1.5 0 0 1 2.5 2h2.764c.958 0 1.76.56 2.311 1.184C7.985 3.648 8.48 4 9 4h4.5A1.5 1.5 0 0 1 15 5.5v7a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 1 12.5v-9zM2.5 3a.5.5 0 0 0-.5.5V6h12v-.5a.5.5 0 0 0-.5-.5H9c-.964 0-1.71-.629-2.174-1.154C6.374 3.334 5.82 3 5.264 3H2.5zM14 7H2v5.5a.5.5 0 0 0 .5.5h11a.5.5 0 0 0 .5-.5V7z" />
      </svg>
    );
  } else {
    nameValue = name;

    imageSVG = (
      <svg
        title="fileIcon"
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        fill="currentColor"
        className="bi bi-file-earmark"
        viewBox="0 0 16 16"
      >
        <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z" />
      </svg>
    );
  }

  return (
    <tr data-testid="tableRow">
      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
        {imageSVG}
      </td>
      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
        {nameValue}
      </td>
      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
        {size ? size : "-"}
      </td>
    </tr>
  );
}

export default TableRow;
