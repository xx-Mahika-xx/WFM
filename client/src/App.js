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

  return (
    <div className="w-screen h-screen font-poppins ">
      <BrowserRouter>
        {cookie.token && cookie.token !== undefined ? (
          <Routes>
            <Route
              path="/staffdashboard"
              element={cookie.access === "user" ? <Staff /> : <LoggedInHome />}
            />
            <Route path="/home" element={<LoggedInHome />} />

            <Route path="*" element={<Staff />} />
            <Route path="/employee" element={<EmployeeContainer />} />
          </Routes>
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
