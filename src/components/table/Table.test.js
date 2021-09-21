import { render, act, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Table from "./Table";

const tableData = [
  { name: "sampleDir", sizeKb: 0, type: "dir", items: [] },
  { name: "zebra.go", sizeKb: 520, type: "file" },
  { name: "another.go", sizeKb: 3320, type: "file" },
  { name: "aaaa.go", sizeKb: 3520, type: "file" },
];

const locale = {
  location: { pathname: "/teleport/lib/newTeleport" },
};

describe("Table Component", () => {
  it("renders the table header", () => {
    const { getByTestId } = render(<Table data={[]} />);
    expect(getByTestId("tableHeader")).toHaveTextContent("NameSize (Kb)");
  });

  it("renders the correct amount of table rows", () => {
    const { getAllByTestId } = render(
      <MemoryRouter initialEntries={["/teleport/lib/newTeleport"]}>
        <Table data={tableData} location={locale} />
      </MemoryRouter>
    );
    const tableRowList = getAllByTestId("tableRow");
    expect(tableRowList.length).toBe(4);
  });
});

describe("Sort Functionality", () => {
  it("renders an up arrow on page load", () => {
    const { getByTitle } = render(
      <MemoryRouter initialEntries={["/teleport/lib/newTeleport"]}>
        <Table data={tableData} location={locale} />
      </MemoryRouter>
    );
    const svgTitle = getByTitle("arrowUp");

    expect(svgTitle).toBeTruthy();
  });

  it("changes the arrow direction when clicked", async () => {
    await act(async () => {
      const { getByTitle } = render(
        <MemoryRouter initialEntries={["/teleport/lib/newTeleport"]}>
          <Table data={tableData} location={locale} />
        </MemoryRouter>
      );

      const arrowUp = getByTitle("arrowUp");
      await fireEvent.click(arrowUp);
      const arrowDown = getByTitle("arrowDown");
      expect(arrowDown).toBeTruthy();
    });
  });

  it("only shows name arrow when name is clicked", async () => {
    await act(async () => {
      const { queryByTestId } = render(
        <MemoryRouter initialEntries={["/teleport/lib/newTeleport"]}>
          <Table data={tableData} location={locale} />
        </MemoryRouter>
      );
      const name = queryByTestId("name");
      await fireEvent.click(name);
      const nameArrow = queryByTestId("nameArrow");
      const sizeArrow = queryByTestId("sizeArrow");

      expect(nameArrow).toBeTruthy();
      expect(sizeArrow).toBeNull();
    });
  });

  it("only shows size arrow when size is clicked", async () => {
    await act(async () => {
      const { queryByTestId } = render(
        <MemoryRouter initialEntries={["/teleport/lib/newTeleport"]}>
          <Table data={tableData} location={locale} />
        </MemoryRouter>
      );
      const size = queryByTestId("size");
      await fireEvent.click(size);
      const sizeArrow = queryByTestId("sizeArrow");
      const nameArrow = queryByTestId("nameArrow");

      expect(sizeArrow).toBeTruthy();
      expect(nameArrow).toBeNull();
    });
  });

  it("sorts data by name in ascending order", () => {
    const { queryByTestId, queryAllByTestId, getByTitle } = render(
      <MemoryRouter initialEntries={["/teleport/lib/newTeleport"]}>
        <Table data={tableData} location={locale} />
      </MemoryRouter>
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
      const { queryByTestId, queryAllByTestId, getByTitle } = render(
        <MemoryRouter initialEntries={["/teleport/lib/newTeleport"]}>
          <Table data={tableData} location={locale} />
        </MemoryRouter>
      );
      const arrowUp = getByTitle("arrowUp");
      await fireEvent.click(arrowUp);

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
      const { queryByTestId, queryAllByTestId, getByTitle } = render(
        <MemoryRouter initialEntries={["/teleport/lib/newTeleport"]}>
          <Table data={tableData} location={locale} />
        </MemoryRouter>
      );
      const size = queryByTestId("size");
      await fireEvent.click(size);
      const rows = queryAllByTestId("sizeValue").map((val) => val.innerHTML);

      expect(rows).toEqual(["-", "520", "3320", "3520"]);
    });
  });

  it("sorts data by size in descending order", async () => {
    await act(async () => {
      const { queryByTestId, queryAllByTestId, getByTitle } = render(
        <MemoryRouter initialEntries={["/teleport/lib/newTeleport"]}>
          <Table data={tableData} location={locale} />
        </MemoryRouter>
      );
      const size = queryByTestId("size");
      await fireEvent.click(size);
      const sizeArrow = queryByTestId("sizeArrow");
      await fireEvent.click(sizeArrow);
      const rows = queryAllByTestId("sizeValue").map((val) => val.innerHTML);

      expect(rows).toEqual(["3520", "3320", "520", "-"]);
    });
  });
});
