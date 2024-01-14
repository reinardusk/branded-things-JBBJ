import { redirect, createBrowserRouter } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import AddProductPage from "./views/AddProductPage";
import AddUserPage from "./views/AddUserPage";
import CategoriesPage from "./views/CategoriesPage";
import CMSHomePage from "./views/CMSHomePage";
import EditProduct from "./views/EditProduct";
import LoginPage from "./views/LoginPage";
import ProductDetail from "./views/ProductDetail";
import UploadImagePage from "./views/UploadImagePage";

const url = "https://phase2-aio.vercel.app";

export const router = createBrowserRouter([
  {
    loader: () => {
      const access_token = localStorage.getItem("access_token");

      if (access_token) {
        throw redirect("/");
      }
      return null;
    },
    path: "/login",
    element: <LoginPage />,
  },
  {
    element: <RootLayout />,
    loader: () => {
      const access_token = localStorage.getItem("access_token");

      if (access_token) {
        return null;
      }
      throw redirect("/login");
    },
    children: [
      {
        path: "/",
        element: <CMSHomePage url={url} />,
      },
      {
        path: "/addProduct",
        element: <AddProductPage url={url} />,
      },
      {
        path: "/editProduct/:id",
        element: <EditProduct url={url} />,
      },
      {
        path: "/product/:id",
        element: <ProductDetail url={url} />,
      },
      {
        path: "/addUser",
        element: <AddUserPage url={url} />,
      },
      {
        path: "/categories",
        element: <CategoriesPage url={url} />,
      },
      {
        path: "/addUser",
        element: <AddUserPage url={url} />,
      },
      {
        path: "/uploadImage/:id",
        element: <UploadImagePage url={url} />,
      },
    ],
  },
]);
