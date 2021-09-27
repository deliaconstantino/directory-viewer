import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import HomePage from "./HomePage";

const existingPath = "/teleport/lib";
const nonexistentPath = "/directory/teleport/teleport";

function homePageWithRouter(historyProp) {
  const history = createMemoryHistory();
  history.push(historyProp);
  return render(
    <Router history={history}>
      <HomePage />
    </Router>
  );
}

function homePageWithMemoryRouter(initialPath) {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <HomePage />
    </MemoryRouter>
  );
}

function selectSearchInput(defaultPath = "/teleport/lib/newTeleport") {
  const { queryByTestId } = homePageWithMemoryRouter(defaultPath);
  const input = queryByTestId("searchInput");
  return input;
}

describe("HomePage Component", () => {
  it("finds data when the url pattern matches data in the directory", () => {
    homePageWithRouter(existingPath);
    expect(screen.getByText("newTeleport")).toBeTruthy();
  });

  it("does not find data when the url pattern does not match data in the directory", () => {
    homePageWithRouter(nonexistentPath);
    expect(screen.getByText("No matching directories found.")).toBeTruthy();
  });

  it("renders a table when data is found", () => {
    const { getByRole } = homePageWithMemoryRouter(existingPath);
    const table = getByRole("table");
    expect(table).toBeTruthy();
  });

  it("does not render a table when data is not found", () => {
    const { queryByRole } = homePageWithMemoryRouter(nonexistentPath);
    const table = queryByRole("table");
    expect(table).toBeNull();
  });

  it("renders breadcrumbs when data is found", () => {
    const { queryByTestId } = homePageWithMemoryRouter(existingPath);
    const breadcrumbs = queryByTestId("breadcrumbs");
    expect(breadcrumbs).toBeTruthy();
  });

  it("does not render breadcrumbs when data is not found", () => {
    const { queryByTestId } = homePageWithMemoryRouter(nonexistentPath);
    const breadcrumbs = queryByTestId("breadcrumbs");
    expect(breadcrumbs).toBeNull();
  });

  it("does not render 'No matching directories found.' when data is found", () => {
    const { queryByText } = homePageWithMemoryRouter(existingPath);
    const noMatch = queryByText("No matching directories found.");
    expect(noMatch).toBeNull();
  });

  it("renders 'No matching directories found.' when data is not found", () => {
    const { getByText } = homePageWithMemoryRouter(nonexistentPath);
    const noMatch = getByText("No matching directories found.");
    expect(noMatch).toBeTruthy();
  });

  it("renders search bar when data is found based on url", () => {
    const input = selectSearchInput(existingPath);
    expect(input).toBeTruthy();
  });

  it("does not render search bar when data is not found based on url", () => {
    const input = selectSearchInput(nonexistentPath);
    expect(input).toBeNull();
  });
});

describe("SearchBar Functionality", () => {
  it("renders correct number of matches to the search string found in the current directory", () => {
    const input = selectSearchInput();
    fireEvent.change(input, { target: { value: ".go" } });
    const tableRowList = screen.getAllByTestId("tableRow");
    expect(tableRowList.length).toBe(3);
  });

  it("renders an empty table when the search string does not match anything in the current directory", () => {
    const input = selectSearchInput();
    fireEvent.change(input, { target: { value: "xxxx" } });
    const tableRowList = screen.queryAllByTestId("tableRow");
    expect(tableRowList.length).toBe(0);
  });

  it("updates the value in the search bar when the user types in it", () => {
    const input = selectSearchInput();
    const preTypeValue = input.value;
    fireEvent.change(input, { target: { value: ".go" } });
    const postTypeValue = input.value;
    expect(preTypeValue).toBe("");
    expect(postTypeValue).toBe(".go");
  });

  it("clears search bar when a user clicks a link", () => {
    const input = selectSearchInput();
    fireEvent.change(input, { target: { value: ".go" } });
    const preClickValue = input.value;
    const linkValues = screen.getAllByRole("link")
    fireEvent.click(linkValues[0]);
    const postClickValue = input.value;
    expect(postClickValue).toBe("");
  })
});
