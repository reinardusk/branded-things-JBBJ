import Swal from "sweetalert2";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const url = "https://phase2-aio.vercel.app";
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function emailOnChange(event) {
    setEmail(event.target.value);
  }

  function passwordOnChange(event) {
    setPassword(event.target.value);
  }

  async function handleLogin(event) {
    event.preventDefault();
    try {
      let { data } = await axios.post(`${url}/apis/login`, { email, password });
      localStorage.setItem("access_token", data.data.access_token);
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
        <div className="loginPageContainer w-[50%] h-[60%] flex justify-center">
          <form className="loginPageCard w-[100%] h-[100%] flex flex-col justify-center items-center gap-2 border-teal-500 border-2 rounded-md p-10 bg-gray-100">
            <label className="text-3xl font-bold text-teal-500">Email :</label>
            <input
              type="text"
              name="email"
              className="w-[80%] border-teal-500 border rounded"
              onChange={emailOnChange}
              required
            />

            <label className="text-3xl font-bold text-teal-500">
              Password :
            </label>
            <input
              type="password"
              name="password"
              className="w-[80%] border-teal-500 border rounded"
              onChange={passwordOnChange}
              required
            />
            <button
              type="submit"
              value=""
              className="w-[80%] border-teal-500 border rounded hover:bg-blue-400 my-5 text-xl text-white bg-teal-500 font-bold"
              onClick={handleLogin}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
