export function SearchBook({ searchQuery, handleSearch }) {
  return (
    <input
      type="text"
      value={searchQuery}
      onChange={handleSearch}
      placeholder="Search for books"
      className="search-field"
    />
  );
}

export function SearchUser({ searchQuery, handleSearch }) {
  return (
    <input
      type="text"
      value={searchQuery}
      onChange={handleSearch}
      placeholder="Search by username.."
      className="search-field"
    />
  );
}
