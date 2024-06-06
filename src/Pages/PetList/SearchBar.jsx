 

const SearchBar = ({ searchQuery, setSearchQuery, category, setCategory }) => {
  return (
    <div className="mb-4 flex justify-between items-center">
      <input
        type="text"
        placeholder="Search pets by name"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="p-2 border border-gray-300 rounded w-full mr-2"
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="p-2 border border-gray-300 rounded"
      >
        <option value="">All Categories</option>
        <option value="dog">Dog</option>
        <option value="cat">Cat</option>
        <option value="fish">Fish</option>
        <option value="rabbit">Rabbit</option>
      </select>
    </div>
  );
};

export default SearchBar;
