import { useState } from "react";
import CMSHomePage from "./views/CMSHomePage.jsx";
import LoginPage from "./views/LoginPage.jsx";
import AddUserPage from "./views/AddUserPage.jsx";
import Navbar from "./components/Navbar.jsx";
import { router } from "./router";
import { RouterProvider } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0);

  return <RouterProvider router={router} />;
}

export default App;
