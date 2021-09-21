import { useState } from "react";
import TableRow from "./TableRow";
import ArrowUp from "../icons/ArrowUp.js";
import ArrowDown from "../icons/ArrowDown.js";
import { sortBy } from "../../lib/sortBy.js";

function Table({ data, location }) {
  const [showNameArrow, setShowNameArrow] = useState(true);
  const [showSizeArrow, setShowSizeArrow] = useState(false);
  const [arrowDirection, setArrowDirection] = useState(false);

  const columnName = showNameArrow ? "name" : "sizeKb";
  const sortDirection = arrowDirection ? "up" : "down";
  const dataArr = sortBy(data, sortDirection, columnName);

  const arrowType = arrowDirection ? <ArrowUp /> : <ArrowDown />;

  function showNameArrowOnly() {
    setShowNameArrow(true);
    setShowSizeArrow(false);
  }

  function showSizeArrowOnly() {
    setShowSizeArrow(true);
    setShowNameArrow(false);
  }

  function changeArrowDirection() {
    setArrowDirection(!arrowDirection);
  }

  return (
    <div className="flex flex-col mt-6 flex-nowrap truncate">
      <div className="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
          <table className="min-w-full">
            <thead data-testid="tableHeader">
              <tr>
                <th
                  data-testid="name"
                  onClick={showNameArrowOnly}
                  className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50 w-4/12"
                >
                  Name
                  {showNameArrow && (
                    <span
                      data-testid="nameArrow"
                      onClick={changeArrowDirection}
                    >
                      {arrowType}
                    </span>
                  )}
                </th>
                <th
                  data-testid="size"
                  onClick={showSizeArrowOnly}
                  className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50 w-4/12"
                >
                  Size (Kb)
                  {showSizeArrow && (
                    <span
                      data-testid="sizeArrow"
                      onClick={changeArrowDirection}
                    >
                      {arrowType}
                    </span>
                  )}
                </th>
              </tr>
            </thead>
            <tbody>
              {dataArr.map((d, idx) => (
                <TableRow
                  key={idx}
                  name={d.name}
                  size={d.sizeKb}
                  type={d.type}
                  location={location}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Table;
