import { render, screen } from "@testing-library/react";
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

function homePageWithMemoryRouter(initalPath) {
  return render(
    <MemoryRouter initialEntries={[initalPath]}>
      <HomePage/>
    </MemoryRouter>
  );
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
    const { getByRole } = homePageWithMemoryRouter(existingPath)
    const table = getByRole("table");
    expect(table).toBeTruthy();
  });

  it("does not render a table when data is not found", () => {
    const { queryByRole } = homePageWithMemoryRouter(nonexistentPath)
    const table = queryByRole("table");
    expect(table).toBeNull();
  });

  it("renders breadcrumbs when data is found", () => {
    const { queryByTestId } = homePageWithMemoryRouter(existingPath)
    const breadcrumbs = queryByTestId("breadcrumbs");
    expect(breadcrumbs).toBeTruthy();
  });

  it("does not render breadcrumbs when data is not found", () => {
    const { queryByTestId } = homePageWithMemoryRouter(nonexistentPath)
    const breadcrumbs = queryByTestId("breadcrumbs");
    expect(breadcrumbs).toBeNull();
  });

  it("does not render 'No matching directories found.' when data is found", () => {
    const { queryByText } = homePageWithMemoryRouter(existingPath)
    const noMatch = queryByText("No matching directories found.");
    expect(noMatch).toBeNull();
  });

  it("renders 'No matching directories found.' when data is not found", () => {
    const { getByText } = homePageWithMemoryRouter(nonexistentPath)
    const noMatch = getByText("No matching directories found.");
    expect(noMatch).toBeTruthy();
  });
});
