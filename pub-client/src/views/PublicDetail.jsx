import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import loadingGif from "../components/assets/shigure-goddess.gif";
import Navbar from "../components/Navbar";

export default function PublicDetail() {
  const url = "https://phase2-aio.vercel.app";
  const { id } = useParams();

  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);

  async function fetchProduct() {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${url}/apis/pub/branded-things/products/` + id
      );
      console.log(data);
      setProduct(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <>
      <Navbar />
      <div className="w-full h-screen bg-gray-900 flex justify-center items-center pt-14">
        <div className="detailProductContainer w-[80%] h-[90%] flex justify-center">
          <div className="detailProductCard w-[100%] h-[100%] flex flex-col items-center gap-2 border-teal-500 border-2 rounded-md p-3 bg-gray-100 relative">
            <img
              src={product.imgUrl}
              className="w-[50%] h-[50%] border-solid border-teal-500 border rounded-md"
            />
            <div className="productName">
              <p className="text-3xl font-bold text-slate-700">
                {product.name}
              </p>
            </div>
            <div className="productPrice font-bold text-lg text-slate-700">
              <span>Rp. {product.price}</span>
            </div>
            <div className="productStock font-bold text-lg text-slate-700">
              <span>Stock: {product.stock}</span>
            </div>
            <div className="productCategory font-bold text-lg text-teal-500">
              <span>Category: {product.Category?.name}</span>
            </div>
            <div className="font-bold text-lg text-slate-700 self-start">
              <span>Description :</span>
            </div>
            <div className="text-base description w-[100%] overflow-scroll text-black tracking-tight my-2 self-start">
              {product.description}
            </div>
            <Link to="/">
              <button className="bg-teal-500 text-white font-bold rounded-md p-2 top-2 right-2 absolute">
                Back
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
