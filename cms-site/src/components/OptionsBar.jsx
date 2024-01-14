export default function OptionsBar() {
  const categories = ["Bajuh", "Celanah", "Sempag"];
  const pages = [1, 2, 3, 4, 5];
  return (
    <>
      <nav className="flex bg-gray-100 justify-between items-center px-5 py-3">
        <form className="w-80">
          <input
            type="search"
            name="search"
            className="w-[80%]"
            placeholder="Search..."
          />
          <input
            type="submit"
            defaultValue=""
            className="hover:bg-gray-900 w-[20%] rounded bg-teal-500 text-white text-semibold"
          />
        </form>
        <div className="flex gap-5 items-center uppercase tracking-wider font-semibold text-xl">
          <h2>Filter By:</h2>
          {categories.map((category) => {
            return (
              <buttton
                className="border rounded-full bg-teal-500 px-3 text-white hover:bg-gray-900"
                key={category}
              >
                {category}
              </buttton>
            );
          })}
        </div>

        <form className="pagination flex">
          <h1 className="font-semibold mx-2">Page</h1>
          <select name="" id="">
            {pages.map((page) => {
              return (
                <option value={page} key={page}>
                  {page}
                </option>
              );
            })}
          </select>
        </form>
      </nav>
    </>
  );
}
