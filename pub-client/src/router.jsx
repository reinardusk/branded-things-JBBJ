import { redirect, createBrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import PublicDetail from "./views/PublicDetail";
import PublicHomePage from "./views/PublicHomePage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicHomePage />,
  },
  {
    path: "/:id",
    element: <PublicDetail />,
  },
]);
