import { useEffect, useState } from "react";
import axios from "axios";
import SubmitButton from "./SubmitButton";

export default function FormInput({ url, handleOnSubmit, nameProp, product }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [imgUrl, setImgUrl] = useState("");
  const [categoryId, setCategoryId] = useState(0);
  const [categories, setCategories] = useState([]);

  async function fetchCategories() {
    try {
      const { data } = await axios.get(
        `${url}/apis/branded-things/categories`,
        { headers: { Authorization: `Bearer ${localStorage.access_token}` } }
      );
      setCategories(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (product) {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setStock(product.stock);
      setImgUrl(product.imgUrl);
      setCategoryId(product.categoryId);
    }
  }, [product]);

  useEffect(() => {
    fetchCategories();
  });

  // function handleOnSubmit(event) {
  //   event.preventDefault();
  //   console.log(event.target[0].value);
  //   setName(event.target[0].value);
  //   console.log(event.target[1].value);
  //   console.log(event.target[2].value);
  //   console.log(event.target[3].value);
  //   console.log(event.target[4].value);
  //   console.log(event.target[5].value);
  // }

  return (
    <>
      <div className="w-full h-screen bg-gray-900 flex justify-center items-center">
        <form
          className="w-[80%] h-[70%] bg-gray-100 rounded-md flex flex-col gap-2 items-center p-2"
          onSubmit={(e) =>
            handleOnSubmit(
              e,
              name,
              description,
              price,
              imgUrl,
              stock,
              categoryId
            )
          }
        >
          <label className="w-[80%] font-medium text-base">Name :</label>
          <input
            className="w-[80%] border border-teal-500 rounded px-2"
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            name="name"
          />

          <label className="w-[80%] font-medium text-base">Description :</label>
          <input
            className="w-[80%] border border-teal-500 rounded px-2"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            type="text"
            name="description"
          />

          <label className="w-[80%] font-medium text-base">Price :</label>
          <input
            className="w-[80%] border border-teal-500 rounded px-2"
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            type="number"
            name="price"
          />

          <label className="w-[80%] font-medium text-base">imageUrl :</label>
          <input
            className="w-[80%] border border-teal-500 rounded px-2"
            onChange={(e) => setImgUrl(e.target.value)}
            value={imgUrl}
            type="text"
            name="imgUrl"
          />

          <label className="w-[80%] font-medium text-base px-2">Stock :</label>
          <input
            className="w-[80%] border border-teal-500 rounded"
            onChange={(e) => setStock(e.target.value)}
            value={stock}
            type="number"
            name="stock"
          />

          <label className="w-[80%] font-medium text-base px-2">
            Category :
          </label>
          <select
            name="categoryId"
            id=""
            className="w-[80%] border border-teal-500"
            onChange={(e) => setCategoryId(e.target.value)}
            value={categoryId}
          >
            <option value="" hidden disabled>
              Choose
            </option>
            {categories.map((category) => {
              return (
                <option value={category.id} key={category.id}>
                  {category.name}
                </option>
              );
            })}
          </select>

          {/* <button
            type="submit"
            className="w-[80%] border-teal-500 border rounded hover:bg-teal-500 hover:text-white my-4"
          >
            {nameProp}
          </button> */}

          <SubmitButton nameProp={nameProp} />
        </form>
      </div>
    </>
  );
}
