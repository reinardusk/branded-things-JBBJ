import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormInput from "../components/FormInput";
import axios from "axios";
import Swal from "sweetalert2";

export default function AddProductPage({ url }) {
  const navigate = useNavigate();

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

      const { data } = await axios.post(
        `${url}/apis/branded-things/products`,
        dataAdded,
        {
          headers: {
            Authorization: `Bearer ${localStorage.access_token}`,
          },
        }
      );
      Swal.fire({
        icon: "success",
        title: "Success add new data",
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
      <div>
        <FormInput
          url={url}
          handleOnSubmit={handleOnSubmit}
          nameProp="Add Product"
        />
      </div>
    </>
  );
}
