import { render, screen } from "@testing-library/react";
import { MemoryRouter, Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import HomePage from "./HomePage";

const existingPath = "/teleport/lib";
const nonexistentPath = "/directory/teleport/teleport";

describe("HomePage Component", () => {
  it("finds data when the url pattern matches data in the directory", () => {
    const history = createMemoryHistory();
    history.push("/teleport/lib");
    render(
      <Router history={history}>
        <HomePage />
      </Router>
    );

    expect(screen.getByText("newTeleport")).toBeTruthy();
  });

  it("does not find data when the url pattern does not match data in the directory", () => {
    const history = createMemoryHistory();
    history.push("/teleport/teleport/lib/hello");
    render(
      <Router history={history}>
        <HomePage />
      </Router>
    );

    expect(screen.getByText("No matching directories found.")).toBeTruthy();
  });

  it("renders a table when data is found", () => {
    const { getByRole } = render(
      <MemoryRouter initialEntries={[existingPath]}>
        <HomePage />
      </MemoryRouter>
    );
    const table = getByRole("table");

    expect(table).toBeTruthy();
  });

  it("does not render a table when data is not found", () => {
    const { queryByRole } = render(
      <MemoryRouter initialEntries={[nonexistentPath]}>
        <HomePage />
      </MemoryRouter>
    );
    const table = queryByRole("table");

    expect(table).toBeNull();
  });

  it("renders breadcrumbs when data is found", () => {
    const { queryByTestId } = render(
      <MemoryRouter initialEntries={[existingPath]}>
        <HomePage />
      </MemoryRouter>
    );
    const breadcrumbs = queryByTestId("breadcrumbs");

    expect(breadcrumbs).toBeTruthy();
  });

  it("does not render breadcrumbs when data is not found", () => {
    const { queryByTestId } = render(
      <MemoryRouter initialEntries={[nonexistentPath]}>
        <HomePage />
      </MemoryRouter>
    );
    const breadcrumbs = queryByTestId("breadcrumbs");

    expect(breadcrumbs).toBeNull();
  });

  it("does not render 'No matching directories found.' when data is found", () => {
    const { queryByText } = render(
      <MemoryRouter initialEntries={[existingPath]}>
        <HomePage />
      </MemoryRouter>
    );
    const noMatch = queryByText("No matching directories found.");

    expect(noMatch).toBeNull();
  });

  it("renders 'No matching directories found.' when data is not found", () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={[nonexistentPath]}>
        <HomePage />
      </MemoryRouter>
    );
    const noMatch = getByText("No matching directories found.");

    expect(noMatch).toBeTruthy();
  });
});
