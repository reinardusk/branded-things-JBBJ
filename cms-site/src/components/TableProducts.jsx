import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function TableProducts({ products, url, fetchProducts }) {
  async function handleDelete(id) {
    try {
      await axios.delete(`${url}/apis/branded-things/products/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      fetchProducts();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: error.response.data.error,
      });
    }
  }

  return (
    <>
      <div className="max-w-screen-m py-20">
        <div className="max-w-lg">
          <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
            Products list
          </h3>
          <p className="text-gray-600 mt-2">Kumpulan data abstrak</p>
        </div>
        <Link to="/addProduct">
          <button className="bg-teal-500 m-2 p-1 rounded hover:text-white shadow-sm">
            Add Product
          </button>
        </Link>
        <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto w-[90%] ml-10">
          <table className="w-full table-auto text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 font-medium border-b">
              <tr>
                <th className="py-3 px-6">Name</th>
                <th className="py-3 px-6">Price</th>
                <th className="py-3 px-6">Stock</th>
                <th className="py-3 px-6">Created By</th>
                <th className="py-3 px-6 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 divide-y">
              {products.map((product, idx) => (
                <tr key={idx}>
                  <td className="flex items-center gap-x-3 py-3 px-6 whitespace-nowrap">
                    <img
                      src={product.imgUrl}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <span className="block text-gray-700 text-sm font-medium">
                        {product.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    Rp. {product.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {product.stock}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {product.User?.username}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap flex justify-center">
                    <button
                      className="border-2 p-1 rounded hover:bg-teal-500 hover:text-white"
                      value={product.id}
                    >
                      <Link to={`/product/${product.id}`}>See Details</Link>
                    </button>
                    <Link to={`/editProduct/${product.id}`}>
                      <button
                        className="border-2 p-1 rounded hover:bg-teal-500 hover:text-white"
                        value={product.id}
                      >
                        Edit
                      </button>
                    </Link>
                    <Link to={`/uploadImage/${product.id}`}>
                      <button
                        className="border-2 p-1 rounded hover:bg-teal-500 hover:text-white"
                        value={product.id}
                      >
                        Upload Image
                      </button>
                    </Link>
                    <button
                      className="border-2 p-1 rounded hover:bg-red-500 hover:text-white"
                      value={product.id}
                      onClick={() => handleDelete(product.id)}
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
