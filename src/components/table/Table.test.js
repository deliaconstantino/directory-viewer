import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Table from "./Table";

const tableData = [
  { name: "newTeleport", sizeKb: 320, type: "file", items: [] },
  { name: "test.go", sizeKb: 3320, type: "file" },
];

const locale = {
  location: { pathname: "/directory/teleport/lib/newTeleport" },
};

describe("Table Component", () => {
  it("renders the table header", () => {
    const { getByTestId } = render(<Table data={[]} />);
    expect(getByTestId("tableHeader")).toHaveTextContent("NameSize (Kb)");
  });

  it("renders the correct amount of table rows", () => {
    const { getAllByTestId } = render(
      <MemoryRouter initialEntries={["/directory/teleport/lib/newTeleport"]}>
        <Table data={tableData} location={locale} />
      </MemoryRouter>
    );
    const tableRowList = getAllByTestId("tableRow");
    expect(tableRowList.length).toBe(2);
  });
});
