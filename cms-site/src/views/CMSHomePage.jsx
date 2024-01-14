import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import TableProducts from "../components/TableProducts";
import Swal from "sweetalert2";
import loadingGif from "../components/assets/shigure-goddess.gif";
import { useNavigate } from "react-router-dom";

export default function CMSHomePage({ url }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function fetchProducts() {
    try {
      setLoading(true);
      const { data } = await axios.get(`${url}/apis/branded-things/products`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      setProducts(data.data);
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: error.response.data.error,
        timer: 1000,
      });
      localStorage.clear();
      navigate("/login");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      {loading ? (
        <div className="h-screen w-screen flex flex-col justify-center items-center">
          <img src={loadingGif} alt="" />
          <p className="font-semibold text-xl">Loading...</p>
        </div>
      ) : (
        <section className="CMSHomePageSection">
          <TableProducts
            products={products}
            url={url}
            fetchProducts={fetchProducts}
          />
        </section>
      )}
    </>
  );
}
