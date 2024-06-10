 

const SearchBar = ({ searchQuery, setSearchQuery, category, setCategory }) => {
  return (
    <div className="mb-4 flex justify-between items-center w-1/2 text-center mx-auto dark:text-black dark:bg-slate-600 ">
      <input
        type="text"
        placeholder="Search pets by name"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="p-2 border border-gray-300 rounded w-full mr-2 lg:p-5"
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="p-2 border border-gray-300 rounded bg-green-500 lg:p-5"
      >
        <option value="">All Categories</option>
        <option value="dog">Dog</option>
        <option value="cat">Cat</option>
        <option value="fish">Fish</option>
        <option value="rabbit">Rabbit</option>
        <option value="bird">Bird</option>
      </select>
    </div>
  );
};

export default SearchBar;
