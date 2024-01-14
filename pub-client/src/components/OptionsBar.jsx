export default function OptionsBar({
  searchOnChange,
  categories,
  filterOnChange,
  sortOnChange,
  limitOnChange,
}) {
  // const dummies = ["Bajuh", "Celanah", "Sempag"];
  const limits = [4, 5, 6, 7, 8, 9, 10, 11, 12];
  const sorts = ["ASC", "DESC"];

  return (
    <>
      <nav className="flex bg-gray-100 justify-between items-center px-5 py-3">
        <form className="w-80" onSubmit={(e) => e.preventDefault()}>
          <input
            type="search"
            name="search"
            className="w-[80%]"
            placeholder="Search..."
            onChange={searchOnChange}
          />
          <input
            type="submit"
            defaultValue=""
            className="hover:bg-gray-900 w-[20%] rounded bg-teal-500 text-white text-semibold"
          />
        </form>

        <div className="flex gap-5 items-center uppercase tracking-wider font-semibold text-xl">
          <h2>Filter By:</h2>
          <select name="filter" id="" onChange={filterOnChange}>
            <option
              value=""
              className="border rounded-full bg-gray-100 px-3 text-slate-700 hover:bg-gray-900"
            >
              All
            </option>
            {categories.map((category) => {
              return (
                <option
                  value={category.name}
                  key={category.id}
                  className="border rounded-full bg-gray-100 px-3 text-slate-700 hover:bg-gray-900"
                >
                  {category.name}
                </option>
              );
            })}
          </select>
        </div>

        <div className="flex gap-5 items-center uppercase tracking-wider font-semibold text-xl">
          <h2>Sort: </h2>
          <select name="sort" id="" onInput={sortOnChange}>
            <option selected disabled hidden value="ASC">
              SORT
            </option>
            {sorts.map((sort) => {
              return (
                <option
                  className="border rounded-full bg-gray-100 px-3 text-slate-700 hover:bg-gray-900"
                  value={sort}
                  key={sort}
                >
                  {sort}
                </option>
              );
            })}
          </select>
        </div>

        <form className="pagination flex">
          <h1 className="mx-2 font-semibold text-xl">Data perPage:</h1>
          <select
            name="limit"
            id=""
            className="mx-2 font-semibold text-xl"
            onChange={limitOnChange}
          >
            <option value={10} selected hidden disabled>
              10
            </option>
            {limits.map((limit) => {
              return (
                <option value={limit} key={limit}>
                  {limit}
                </option>
              );
            })}
          </select>
        </form>
      </nav>
    </>
  );
}
