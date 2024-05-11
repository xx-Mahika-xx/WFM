import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import TextInput from "../components/TextInput";
import PasswordInput from "../components/PasswordInput";
import Navbar from "../Navbar/Navbar";
import { makeUnauthenticatedPOSTRequest } from "../utils/serverHelper";

const SignupComponent = () => {
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [cookie, setCookie] = useCookies(["token"]);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  };

  const signUp = async () => {
    if (!validateEmail(email)) {
      setAlertType("error");
      setAlertMessage("Please enter a valid email address.");
      return;
    }

    if (email !== confirmEmail) {
      setAlertType("error");
      setAlertMessage(
        "Email and confirm email fields must match. Please check again."
      );
      return;
    }
    if (!email || !firstName || !lastName || !password || !username) {
      setAlertType("error");
      setAlertMessage("All the fields are required. Please check again.");
      return;
    }

    const data = {
      email,
      password,
      username,
      firstName,
      lastName,
      access: "user",
    };
    const response = await makeUnauthenticatedPOSTRequest(
      "/auth/register",
      data
    );
    if (response && !response.err) {
      const token = response.token;
      const date = new Date();
      date.setDate(date.getDate() + 5);
      setCookie("token", token, { path: "/", expires: date });
      setCookie("username", response.username, { path: "/", expires: date });
      setCookie("access", response.access, { path: "/", expires: date });
      setAlertType("success");
      setAlertMessage("Success");
      navigate("/home");
    } else {
      setAlertType("error");
      setAlertMessage("Failure");
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
      <div className="inputRegion w-full max-w-lg py-10 flex flex-col items-center justify-center">
        <div className="font-bold mb-8 text-3xl">
          Sign up for free to start applying
        </div>
        <div className="w-full space-y-6">
          <TextInput
            label="Email address"
            placeholder="Enter your email"
            value={email}
            setValue={setEmail}
            type="email"
          />
          <TextInput
            label="Confirm Email Address"
            placeholder="Enter your email again"
            value={confirmEmail}
            setValue={setConfirmEmail}
            type="email"
          />
          <TextInput
            label="Username"
            placeholder="Enter your username"
            value={username}
            setValue={setUsername}
            type="text"
          />
          <PasswordInput
            label="Create Password"
            placeholder="Enter a strong password here"
            value={password}
            setValue={setPassword}
          />
          <div className="flex flex-col md:flex-row w-full space-y-4 md:space-y-0 md:space-x-4">
            <TextInput
              label="First Name"
              placeholder="Enter Your First Name"
              value={firstName}
              setValue={setFirstName}
              type="text"
            />
            <TextInput
              label="Last Name"
              placeholder="Enter Your Last Name"
              value={lastName}
              setValue={setLastName}
              type="text"
            />
          </div>
        </div>
        <div className="w-full border border-solid border-gray-300 my-8"></div>
        <div className="flex justify-center">
          <button
            className="px-8 py-3 rounded-full font-semibold bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow-md hover:shadow-lg transition duration-300 ease-in-out"
            onClick={signUp}
          >
            Sign Up
          </button>
        </div>
        <div className="text-lg mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Log in instead
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignupComponent;
