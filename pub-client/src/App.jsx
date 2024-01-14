import Navbar from "./components/Navbar";
import OptionsBar from "./components/OptionsBar";
import PublicDetail from "./views/PublicDetail";
import PublicHomePage from "./views/PublicHomePage";

import { RouterProvider } from "react-router-dom";
import { router } from "./router.jsx";

function App() {
  return <RouterProvider router={router} />;
}

export default App;
