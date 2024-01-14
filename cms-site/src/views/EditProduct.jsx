import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FormInput from "../components/FormInput";
import axios from "axios";
import Swal from "sweetalert2";
import loadingGif from "../components/assets/shigure-goddess.gif";

export default function EditProduct({ url }) {
  // const Forms = ({ onSubmit, name }) => {
  //   const [form, setForm] = useState({
  //     name: "",
  //     description: "",
  //     price: "",
  //     stock: "",
  //     imgUrl: "",
  //     categoryId: "",
  //   });

  //   function handleChange(event) {
  //     setForm({ ...form, [event.target.name]: event.target.value });
  //     console.log(form);
  //   }
  // };
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
      });

      navigate("/");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProduct();
  }, []);

  async function handleOnSubmit(
    event,
    name,
    description,
    price,
    imgUrl,
    stock,
    categoryId
  ) {
    event.preventDefault();
    try {
      const dataAdded = {
        name,
        description,
        price: +price,
        imgUrl,
        stock: +stock,
        categoryId: +categoryId,
      };

      const { data } = await axios.put(
        `${url}/apis/branded-things/products/${id}`,
        dataAdded,
        {
          headers: {
            Authorization: `Bearer ${localStorage.access_token}`,
          },
        }
      );
      // console.log(dataAdded);
      // console.log(data);
      Swal.fire({
        icon: "success",
        title: "Success edit",
        timer: 1000,
      });

      navigate("/");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: error.response.data.error,
      });
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
        <div>
          <FormInput
            url={url}
            handleOnSubmit={handleOnSubmit}
            nameProp="Edit Product"
            product={product}
          />
        </div>
      )}
    </>
  );
}
