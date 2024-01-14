import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import Swal from "sweetalert2";
import loadingGif from "../components/assets/shigure-goddess.gif";

export default function ProductDetail({ url }) {
  const [product, setProduct] = useState({});
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProduct();
  }, []);

  async function fetchProduct() {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${url}/apis/branded-things/products/${id}`,
        {
          headers: { Authorization: `Bearer ${localStorage.access_token}` },
        }
      );
      setProduct(data.data);
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: error.response.data.error,
        timer: 1000,
      });
      navigate("/");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {loading ? (
        <div className="h-screen w-screen flex flex-col justify-center items-center">
          <img src={loadingGif} alt="" />
          <p className="font-semibold text-xl">Loading...</p>
        </div>
      ) : (
        <div className="max-w-screen-m pt-20 flex flex-col items-center justify-center h-screen">
          <div className="container w-[90%] h-[90%] flex flex-col gap-2 items-center border border-teal-500 rounded-md px-2 bg-gray-200 relative">
            <img
              src={product.imgUrl}
              className="h-[50%] w-[40%] border border-white rounded mt-3"
              alt=""
            />
            <p className=" text-2xl font-bold text-slate-700">{product.name}</p>
            <p className="text-xl font-bold text-slate-700">
              Stock: {product.stock}
            </p>
            <p className="text-xl font-bold text-slate-700">
              Price: Rp.{product.price}
            </p>
            <p className="text-l font-bold text-slate-700 ">Description :</p>
            <p className="text-l font-bold text-slate-700 ">
              {product.description}
            </p>
            <Link to="/">
              <button className="bg-teal-500 text-white font-bold rounded-md p-2 top-2 right-2 absolute">
                Back
              </button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
