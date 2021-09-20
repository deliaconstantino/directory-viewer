import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Page from "./Page";

const tableData = [
  { name: "newTeleport", sizeKb: 320, type: "dir", items: [] },
  { name: "test.go", sizeKb: 3320, type: "file" },
];

const existingPath = "/directory/teleport/lib";

const nonexistentPath = "/directory/teleport/teleport"

describe("Page Component", () => {
  it("renders a table when errorMessage is false", () => {
    const { getByRole } = render(
      <MemoryRouter initialEntries={[existingPath]}>
        <Page
          data={tableData}
          location={{ pathname: existingPath }}
          errorMessage={false}
        />
      </MemoryRouter>
    );
    const table = getByRole("table");
    expect(table).toBeTruthy();
  });

  it("does not render the NoMatchFound alert when errorMessage is false", () => {
    const { queryByText } = render(
      <MemoryRouter initialEntries={[existingPath]}>
        <Page
          data={tableData}
          location={{ pathname: existingPath }}
          errorMessage={false}
        />
      </MemoryRouter>
    );
    const noMatch = queryByText("No matching directories found.");
    expect(noMatch).toBeNull();
  });

  it("renders the NoMatchFound alert when errorMessage is true", () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={[nonexistentPath]}>
        <Page
          data={null}
          location={{ pathname: nonexistentPath }}
          errorMessage={true}
        />
      </MemoryRouter>
    );
    const noMatch = getByText("No matching directories found.");
    expect(noMatch).toBeTruthy();
  });

  it("does not render a table when errorMessage is true", () => {
    const { queryByRole } = render(
      <MemoryRouter initialEntries={[nonexistentPath]}>
        <Page
          data={null}
          location={{ pathname: nonexistentPath }}
          errorMessage={true}
        />
      </MemoryRouter>
    );
    const table = queryByRole("table");
    expect(table).toBeNull();
  });
});
