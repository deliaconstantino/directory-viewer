import SearchBar from "./SearchBar";
import { render } from "@testing-library/react";

describe("SearchBar Component", () => {
  it("renders the current value in the search bar", () => {
    const { getByTestId } = render(
      <SearchBar
        searchValue="sample.dir"
        onSearchParamsChange={() => {}}
      />
    );
    const input = getByTestId("searchInput");
    expect(input.value).toBe("sample.dir");
  });
});
