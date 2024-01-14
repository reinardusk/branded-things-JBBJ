import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import SubmitButton from "../components/SubmitButton";

export default function AddUserPage({ url }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");

  async function handleAddUser(event) {
    event.preventDefault();
    try {
      setUsername(event.target[0].value);
      setEmail(event.target[1].value);
      setPassword(event.target[2].value);
      setPhoneNumber(event.target[3].value);
      setAddress(event.target[4].value);

      // console.log(event.target[0].value);
      // console.log(event.target[1].value);
      // console.log(event.target[2].value);
      // console.log(event.target[3].value);
      // console.log(event.target[4].value);

      const addNewUser = {
        username,
        email,
        password,
        phoneNumber,
        address,
      };

      await axios.post(`${url}/apis/add-user`, addNewUser, {
        headers: { Authorization: `Bearer ${localStorage.access_token}` },
      });

      Swal.fire({
        icon: "success",
        title: "Success add new user",
        timer: 1000,
      });

      navigate("/");
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: error.response.data.error,
      });
    }
  }

  return (
    <>
      <div className=" w-full h-screen bg-gray-900 flex justify-center items-center">
        <div className="loginPageContainer w-[50%] h-[70%] flex justify-center">
          <form
            className="loginPageCard w-[100%] h-[100%] flex flex-col justify-center items-center gap-2 border-teal-500 border-2 rounded-md p-10 bg-gray-100"
            onSubmit={handleAddUser}
          >
            <label className="text-xl font-bold text-teal-500">
              Username :
            </label>
            <input
              type="text"
              name="username"
              className="w-[80%] border-teal-500 border rounded"
            />
            <label className="text-xl font-bold text-teal-500">Email :</label>
            <input
              type="text"
              name="email"
              className="w-[80%] border-teal-500 border rounded"
            />

            <label className="text-xl font-bold text-teal-500">
              Password :
            </label>
            <input
              type="password"
              name="password"
              className="w-[80%] border-teal-500 border rounded"
            />
            <label className="text-xl font-bold text-teal-500">
              Phone Number :
            </label>
            <input
              type="text"
              name="password"
              className="w-[80%] border-teal-500 border rounded"
            />
            <label className="text-xl font-bold text-teal-500">Address :</label>
            <input
              type="text"
              name="password"
              className="w-[80%] border-teal-500 border rounded"
            />
            {/* <button
              type="submit"
              value=""
              className="w-[80%] border-teal-500 border rounded hover:bg-blue-300 my-5 text-xl text-white bg-teal-500 font-bold"
            >
              Add User
            </button> */}
            <SubmitButton nameProp="Add Staff" />
          </form>
        </div>
      </div>
    </>
  );
}
