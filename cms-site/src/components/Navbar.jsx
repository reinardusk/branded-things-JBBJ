import { useNavigate, Link } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  function handleLogout() {
    localStorage.clear();
    navigate("/login");
  }

  return (
    <>
      <nav className="flex bg-gray-900 justify-between items-center px-5 py-3 fixed w-full border border-b-2 border-t-0 border-l-0 border-r-0 border-teal-500">
        <Link to="/">
          <h1 className="text-4xl first-letter:text-5xl first-letter:text-white font-bold text-teal-500">
            JB-BJ
          </h1>
        </Link>
        <div className="w-[30%]">
          <form className="flex w-full">
            {/* <input
              type="search"
              name="search"
              placeholder="Search..."
              className="rounded w-[70%]"
            />
            <input
              type="submit"
              defaultValue=""
              className="hover:bg-blue-300 text-white rounded font-semibold bg-teal-500 px-2"
            /> */}
          </form>
        </div>
        <ul className="flex gap-5 items-center tracking-wider font-semibold text-xl text-teal-500">
          <Link to="/">
            <li className="cursor-pointer">Home</li>
          </Link>
          <li className="cursor-pointer">
            <Link to="/addUser">Add-Staff</Link>
          </li>
          <li className="cursor-pointer" onClick={handleLogout}>
            Logout
          </li>
        </ul>
      </nav>
    </>
  );
}
