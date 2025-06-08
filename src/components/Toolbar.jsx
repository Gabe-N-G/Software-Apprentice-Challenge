const Toolbar = ({ sortAsc, sortDesc, reset, filterCamp, uniqueCamp }) => {
  return (
    <div
      id="Toolbar"
      className="flex flex-wrap items-center gap-4 bg-white p-4 rounded-md shadow-sm"
    >
      <span className="font-semibold text-gray-700">Sort By:</span>

      <div className="flex items-center space-x-2">
        <span className="text-gray-600">Spend:</span>
        <button
          onClick={sortAsc}
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Ascending
        </button>
        <button
          onClick={sortDesc}
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Descending
        </button>
      </div>

      <div className="flex items-center space-x-2">
        <label htmlFor="campaign" className="text-gray-600 font-medium">
          Select Campaign:
        </label>

        <select
          name="campaign"
          id="campaign"
          onChange={filterCamp}
          className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="all">All</option>
          {uniqueCamp.map((camp) => (
            <option key={camp} value={camp}>
              {camp}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={reset}
        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Reset
      </button>
    </div>
  );
};

export default Toolbar;
