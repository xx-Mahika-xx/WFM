import { useState } from "react";
import TextInput from "../components/TextInput.js";
import PasswordInput from "../components/PasswordInput.js";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { makeUnauthenticatedPOSTRequest } from "../utils/serverHelper";
import Navbar from "../Navbar/Navbar.js";

const LoginComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cookies, setCookie] = useCookies(["token"]);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    const data = { email, password };
    const response = await makeUnauthenticatedPOSTRequest("/auth/login", data);
    if (response && !response.err) {
      const token = response.token;
      const date = new Date();
      date.setDate(date.getDate() + 5);
      setCookie("token", token, { path: "/", expires: date });
      setCookie("username", response.username, { path: "/", expires: date });
      setCookie("access", response.access, { path: "/", expires: date });
      setAlertType("success");
      setAlertMessage("Logged in Successfully!");
      navigate("/staffdashboard");
    } else {
      setAlertType("error");
      setAlertMessage("Incorrect credentials. Please try again.");
    }
  };

  return (
    <div
      className="w-full h-full flex flex-col items-center text-black overflow-auto"
      style={{ backgroundColor: "#FFF2E1" }}
    >
      <div
        className="navbar-container"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        <Navbar />
      </div>
      <div className="logo p-5 border-b border-solid border-gray-300 w-full flex justify-center"></div>
      {alertMessage && (
        <div
          className={`${
            alertType === "success"
              ? "bg-green-100 border-green-500"
              : "bg-red-100 border-red-500"
          } border-t-4 rounded-b text-${
            alertType === "success" ? "green" : "red"
          }-900 px-4 py-3 shadow-md mb-6`}
          role="alert"
        >
          <div className="flex items-center">
            <svg
              className={`h-6 w-6 mr-4 text-${
                alertType === "success" ? "green" : "red"
              }-500`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12zM9 9a1 1 0 112 0v4a1 1 0 11-2 0V9zm2-4a1 1 0 11-2 0 1 1 0 012 0z"
                clipRule="evenodd"
              />
            </svg>
            <p className="font-bold">{alertMessage}</p>
          </div>
        </div>
      )}
      <div className="inputRegion w-1/3 py-10 flex flex-col items-center justify-center">
        <h2 className="text-3xl font-bold mb-6">Log in to continue</h2>
        <TextInput
          label="Email address"
          placeholder="Email address"
          className="mb-4"
          value={email}
          setValue={setEmail}
        />
        <PasswordInput
          label="Password"
          placeholder="Password"
          value={password}
          setValue={setPassword}
        />
        <button
          className="bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-full font-semibold py-3 px-8 mt-6 hover:from-blue-500 hover:to-blue-700"
          onClick={login}
        >
          LOG IN
        </button>
        <div className="w-full border border-solid border-gray-300 my-6"></div>
        <div className="text-lg font-semibold mb-4">Don't have an account?</div>
        <Link
          to="/signup"
          className="border border-gray-500 text-gray-500 rounded-full font-bold py-3 px-8 transition duration-300 ease-in-out hover:border-white hover:text-white"
        >
          SIGN UP
        </Link>
      </div>
    </div>
  );
};

export default LoginComponent;
