import "./output.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomeComponent from "./routes/HomeComponent";
import LoginComponent from "./routes/Login";
import Staff from "./routes/Staff";
import SignupComponent from "./routes/Signup";
import LoggedInHome from "./routes/LoggedInHome.js";
import { useCookies } from "react-cookie";
import EmployeeContainer from "./Pages/Employee.js";

function App() {
  const [cookie] = useCookies(["token"]);

  console.log("Cookie: ",cookie.access);
  return (
    <div className="w-screen h-screen font-poppins">
      <BrowserRouter>
        {cookie.token ? (
          cookie.access === "admin" ? (
            <Routes>
              <Route path="/staffdashboard" element={<Staff />} />
              <Route path="/home" element={<LoggedInHome />} />
              <Route path="*" element={<Navigate to="/staffdashboard" />} />
            </Routes>
          ) : cookie.access === "user" ? (
            <Routes>
              <Route path="/employee" element={<EmployeeContainer />} />
              <Route path="/home" element={<LoggedInHome />} />
              <Route path="*" element={<Navigate to="/employee" />} />
            </Routes>
          ) : (
            <Routes>
              <Route path="/home" element={<LoggedInHome />} />
              <Route path="*" element={<Navigate to="/home" />} />
            </Routes>
          )
        ) : (
          <Routes>
            <Route path="/home" element={<HomeComponent />} />
            <Route path="/login" element={<LoginComponent />} />
            <Route path="/signup" element={<SignupComponent />} />
            <Route path="*" element={<Navigate to="/home" />} />
          </Routes>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
