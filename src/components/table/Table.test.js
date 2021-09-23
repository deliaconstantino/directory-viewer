import { fireEvent, render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Table from "./Table";

const defaultTableData = [
  { name: "sampleDir", sizeKb: 0, type: "dir", items: [] },
  { name: "zebra.go", sizeKb: 520, type: "file" },
  { name: "another.go", sizeKb: 3320, type: "file" },
  { name: "aaaa.go", sizeKb: 3520, type: "file" },
];

const defaultLocation = { pathname: "/teleport/lib/newTeleport" };

function renderTable(
  tableProps = { data: defaultTableData, location: defaultLocation },
  initialEntries = ["/teleport/lib/newTeleport"]
) {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <Table {...tableProps} />
    </MemoryRouter>
  );
}

describe("Table Component", () => {
  it("renders the table header", () => {
    const { getByTestId } = renderTable();
    expect(getByTestId("tableHeader")).toHaveTextContent("NameSize (Kb)");
  });

  it("renders the correct amount of table rows", () => {
    const { getAllByTestId } = renderTable();
    const tableRowList = getAllByTestId("tableRow");
    expect(tableRowList.length).toBe(4);
  });
});

describe("Sort Functionality", () => {
  it("renders an up arrow on page load", () => {
    const { getByTitle } = renderTable();
    const svgTitle = getByTitle("arrowUp");

    expect(svgTitle).toBeTruthy();
  });

  it("changes the arrow direction when clicked", () => {
    const { getByTitle } = renderTable();
    const arrowUp = getByTitle("arrowUp");
    fireEvent.click(arrowUp);
    const arrowDown = getByTitle("arrowDown");

    expect(arrowDown).toBeTruthy();
  });

  it("only shows name arrow when name is clicked", () => {
    const { queryByTestId } = renderTable();
    const name = queryByTestId("name");
    fireEvent.click(name);
    const nameArrow = queryByTestId("nameArrow");
    const sizeArrow = queryByTestId("sizeArrow");

    expect(nameArrow).toBeTruthy();
    expect(sizeArrow).toBeNull();
  });

  it("only shows size arrow when size is clicked", () => {
    const { queryByTestId } = renderTable();
    const size = queryByTestId("size");
    fireEvent.click(size);
    const sizeArrow = queryByTestId("sizeArrow");
    const nameArrow = queryByTestId("nameArrow");

    expect(sizeArrow).toBeTruthy();
    expect(nameArrow).toBeNull();
  });

  it("sorts data by name in ascending order", () => {
    const { queryByTestId, queryAllByTestId, getByTitle } = renderTable();
    const rowsInnerHTML = queryAllByTestId("nameValue").map(
      (val) => val.innerHTML
    );

    const innerValues = [
      "aaaa.go",
      "another.go",
      '<a class="text-blue-500 underline" href="/teleport/lib/newTeleport/sampleDir">sampleDir</a>',
      "zebra.go",
    ];

    expect(rowsInnerHTML).toEqual(innerValues);
  });

  it("sorts data by name in descending order", () => {
    const { queryByTestId, queryAllByTestId, getByTitle } = renderTable();
    const name = queryByTestId("name");
    fireEvent.click(name);

    const rowsInnerHTML = queryAllByTestId("nameValue").map(
      (val) => val.innerHTML
    );

    const innerValues = [
      "zebra.go",
      '<a class="text-blue-500 underline" href="/teleport/lib/newTeleport/sampleDir">sampleDir</a>',
      "another.go",
      "aaaa.go",
    ];

    expect(rowsInnerHTML).toEqual(innerValues);
  });

  it("sorts data by size in ascending order", () => {
    const { queryByTestId, queryAllByTestId, getByTitle } = renderTable();
    const size = queryByTestId("size");
    fireEvent.click(size);
    const rows = queryAllByTestId("sizeValue").map((val) => val.innerHTML);

    expect(rows).toEqual(["-", "520", "3320", "3520"]);
  });

  it("sorts data by size in descending order", () => {
    const { queryByTestId, queryAllByTestId, getByTitle } = renderTable();
    const size = queryByTestId("size");
    fireEvent.click(size);
    fireEvent.click(size);
    const rows = queryAllByTestId("sizeValue").map((val) => val.innerHTML);

    expect(rows).toEqual(["3520", "3320", "520", "-"]);
  });
});
