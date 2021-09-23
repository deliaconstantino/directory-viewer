import MagnifyingGlass from "../components/icons/MagnifyingGlass";

function SearchBar({ onSearchParamsChange, searchValue }) {
  return (
    <div className="shadow flex flex mt-5 rounded-lg">
      <div className="outline-none bg-gray-50 w-auto flex justify-end items-center p-2">
        <MagnifyingGlass />
      </div>
      <input
        className="px-2 w-full h-12 outline-none rounded-lg bg-gray-50 focus:bg-white"
        type="text"
        value={searchValue}
        placeholder="search current directory..."
        onChange={onSearchParamsChange}
      />
    </div>
  );
}

export default SearchBar;
