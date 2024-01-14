import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

export default function UploadImagePage({ url }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [image, setImage] = useState({});
  const [loading, setLoading] = useState(false);

  async function fetchProduct() {
    try {
      const { data } = await axios.get(
        `${url}/apis/branded-things/products/${id}`,
        { headers: { Authorization: `Bearer ${localStorage.access_token}` } }
      );

      setProduct(data.data);
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: error.response.data.error,
      });
    }
  }

  useEffect(() => {
    fetchProduct();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let formData = new FormData();

      formData.append("file", image);
      await axios.patch(`${url}/apis/branded-things/products/${id}`, formData, {
        headers: { Authorization: `Bearer ${localStorage.access_token}` },
      });
      navigate("/");
      // console.log(image);
      // console.log(formData);
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: error.response.data.error,
      });
    }
  };

  return (
    <>
      <div className="max-w-screen-m pt-20 flex flex-col items-center justify-center h-screen">
        <div className="container w-[90%] h-[90%] flex flex-col gap-2 items-center border border-teal-500 rounded-md px-2 bg-gray-200">
          <p className=" text-2xl font-bold text-slate-700">{product.name}</p>
          <img
            src={product.imgUrl}
            className="h-[50%] w-[40%] border border-white rounded mt-3"
            alt=""
          />
          <form
            className="form flex flex-col gap-5"
            action=""
            onSubmit={handleSubmit}
          >
            <input
              type="file"
              name="file"
              id=""
              onChange={(e) => {
                setImage(e.target.files[0]);
              }}
            />
            <button
              className="border-2 p-1 rounded bg-teal-500 hover:bg-blue-500 hover:text-white"
              type="submit"
            >
              Upload
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
