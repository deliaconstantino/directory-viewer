import { act, fireEvent } from "@testing-library/react";
import { renderWithRouter } from "../../test-utils";
import Table from "./Table";

const data = [
  { name: "sampleDir", sizeKb: 0, type: "dir", items: [] },
  { name: "zebra.go", sizeKb: 520, type: "file" },
  { name: "another.go", sizeKb: 3320, type: "file" },
  { name: "aaaa.go", sizeKb: 3520, type: "file" },
];

const location = {
  location: { pathname: "/teleport/lib/newTeleport" },
};

const initialEntries = ["/teleport/lib/newTeleport"];

describe("Table Component", () => {
  it("renders the table header", () => {
    const { getByTestId } = renderWithRouter(
      <Table data={data} location={location} />,
      initialEntries
    );
    expect(getByTestId("tableHeader")).toHaveTextContent("NameSize (Kb)");
  });

  it("renders the correct amount of table rows", () => {
    const { getAllByTestId } = renderWithRouter(
      <Table data={data} location={location} />,
      initialEntries
    );
    const tableRowList = getAllByTestId("tableRow");
    expect(tableRowList.length).toBe(4);
  });
});

describe("Sort Functionality", () => {
  it("renders an up arrow on page load", () => {
    const { getByTitle } = renderWithRouter(
      <Table data={data} location={location} />,
      initialEntries
    );
    const svgTitle = getByTitle("arrowUp");

    expect(svgTitle).toBeTruthy();
  });

  it("changes the arrow direction when clicked", async () => {
    await act(async () => {
      const { getByTitle } = renderWithRouter(
        <Table data={data} location={location} />,
        initialEntries
      );

      const arrowUp = getByTitle("arrowUp");
      await fireEvent.click(arrowUp);
      const arrowDown = getByTitle("arrowDown");
      expect(arrowDown).toBeTruthy();
    });
  });

  it("only shows name arrow when name is clicked", async () => {
    await act(async () => {
      const { queryByTestId } = renderWithRouter(
        <Table data={data} location={location} />,
        initialEntries
      );
      const name = queryByTestId("name");
      await fireEvent.click(name);
      const nameArrow = queryByTestId("nameArrow");
      const sizeArrow = queryByTestId("sizeArrow");

      expect(nameArrow).toBeTruthy();
      expect(sizeArrow).toBeNull();
    });
  });

  it("only shows size arrow when size is clicked", () => {
    const { queryByTestId } = renderWithRouter(
      <Table data={data} location={location} />,
      initialEntries
    );
    const size = queryByTestId("size");
    fireEvent.click(size);

    const sizeArrow = queryByTestId("sizeArrow");
    const nameArrow = queryByTestId("nameArrow");

    expect(sizeArrow).toBeTruthy();
    expect(nameArrow).toBeNull();
  });

  it("sorts data by name in ascending order", () => {
    const { queryByTestId, queryAllByTestId, getByTitle } = renderWithRouter(
      <Table data={data} location={location} />,
      initialEntries
    );
    const rowsInnerHTML = queryAllByTestId("nameValue").map(
      (val) => val.innerHTML
    );

    const innerValues = [
      "aaaa.go",
      "another.go",
      '<a class="text-blue-500 underline" href="/teleport/lib/undefined/sampleDir">sampleDir</a>',
      "zebra.go",
    ];

    expect(rowsInnerHTML).toEqual(innerValues);
  });

  it("sorts data by name in descending order", async () => {
    await act(async () => {
      const { queryByTestId, queryAllByTestId, getByTitle } = renderWithRouter(
        <Table data={data} location={location} />,
        initialEntries
      );
      const name = queryByTestId("name");
      await fireEvent.click(name);

      const rowsInnerHTML = queryAllByTestId("nameValue").map(
        (val) => val.innerHTML
      );

      const innerValues = [
        "zebra.go",
        '<a class="text-blue-500 underline" href="/teleport/lib/undefined/sampleDir">sampleDir</a>',
        "another.go",
        "aaaa.go",
      ];

      expect(rowsInnerHTML).toEqual(innerValues);
    });
  });

  it("sorts data by size in ascending order", async () => {
    await act(async () => {
      const { queryByTestId, queryAllByTestId, getByTitle } = renderWithRouter(
        <Table data={data} location={location} />,
        initialEntries
      );
      const size = queryByTestId("size");
      await fireEvent.click(size);
      const rows = queryAllByTestId("sizeValue").map((val) => val.innerHTML);

      expect(rows).toEqual(["-", "520", "3320", "3520"]);
    });
  });

  it("sorts data by size in descending order", async () => {
    await act(async () => {
      const { queryByTestId, queryAllByTestId, getByTitle } = renderWithRouter(
        <Table data={data} location={location} />,
        initialEntries
      );
      const size = queryByTestId("size");
      await fireEvent.click(size);
      await fireEvent.click(size);
      const rows = queryAllByTestId("sizeValue").map((val) => val.innerHTML);

      expect(rows).toEqual(["3520", "3320", "520", "-"]);
    });
  });
});
