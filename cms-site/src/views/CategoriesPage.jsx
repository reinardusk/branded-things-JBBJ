import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

export default function CategoriesPage({ url }) {
  const [categories, setCategories] = useState([]);

  async function fetchCategories() {
    try {
      const { data } = await axios.get(
        `${url}/apis/branded-things/categories`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.access_token}`,
          },
        }
      );
      setCategories(data.data);
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: error.response.data.error,
      });
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
      <div className="max-w-screen-m py-20">
        <div className="max-w-lg">
          <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
            Category List
          </h3>
          <p className="text-gray-600 mt-2">Kumpulan category</p>
        </div>
        <Link to="/addProduct">
          <button className="bg-teal-500 m-2 p-1 rounded hover:text-white shadow-sm">
            Add Category
          </button>
        </Link>
        <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto w-[90%] ml-10">
          <table className="w-full table-auto text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 font-medium border-b">
              <tr>
                <th className="py-3 px-6">No.</th>
                <th className="py-3 px-6">Name</th>
                <th className="py-3 px-6 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 divide-y">
              {categories.map((category, idx) => (
                <tr key={idx}>
                  <td className="px-6 py-4 whitespace-nowrap">{idx + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {category.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap flex justify-center">
                    <button
                      className="border-2 p-1 rounded hover:bg-teal-500 hover:text-white"
                      value={category.id}
                    >
                      <Link to={`/product/${category.id}`}>See Details</Link>
                    </button>
                    <Link to={`/editProduct/${category.id}`}>
                      <button
                        className="border-2 p-1 rounded hover:bg-teal-500 hover:text-white"
                        value={category.id}
                      >
                        Edit
                      </button>
                    </Link>
                    <button
                      className="border-2 p-1 rounded hover:bg-teal-500 hover:text-white"
                      value={category.id}
                      onClick={() => handleDelete(category.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
