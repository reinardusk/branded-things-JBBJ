import { useNavigate, Link, Outlet } from "react-router-dom";

export default function Navbar() {
  return (
    <>
      <nav className="flex bg-gray-900 justify-between items-center px-5 py-3 fixed w-full border border-b-2 border-t-0 border-l-0 border-r-0 border-teal-500">
        <Link to="/">
          <h1 className="text-4xl first-letter:text-5xl first-letter:text-white font-bold text-teal-500">
            JB-BJ
          </h1>
        </Link>
      </nav>
    </>
  );
}
