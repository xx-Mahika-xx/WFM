import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import HexagonalImage from "../components/HexagonalImage";

const HomeComponent = () => {
  return (
    <div
      className="w-full h-full overflow-auto"
      style={{ backgroundColor: "#FFF2E1" }}
    >
      <div className="h-full">
        <div className="flex p-8 justify-between font-semibold">
          <Navbar />
          <div className="flex">
            <Link
              to="/signup"
              className="bg-white text-blue-600 px-4 py-2 mx-2 rounded-full hover:bg-blue-600 hover:text-white transition duration-300 flex items-center justify-center"
            >
              Sign Up
            </Link>
            <Link
              to="/login"
              className="bg-gradient-to-r from-blue-400 to-blue-600 text-white px-4 py-2 mx-2 rounded-full hover:from-blue-500 hover:to-blue-700 hover:text-white transition duration-300 flex items-center justify-center"
            >
              Log In
            </Link>
          </div>
        </div>
        <div className="flex flex-row items-center justify-evenly h-below-navbar">
          <div>
            <HexagonalImage imglink="female_doctor.jpg" />
          </div>
          <div className="text-center text-black">
            <h1 className="text-6xl font-semibold mt-6">Welcome to</h1>{" "}
            {/* Decreased margin top */}
            <h2 className="text-7xl font-semibold mt-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
              WFM
            </h2>
            <p className="text-xl text-color12 mt-5 max-w-md">
              A new LLM based application to optimize staff allocation in
              hospitals.
            </p>
            <div className="flex justify-center mt-8">
              <Link
                to="/login"
                className="bg-gradient-to-r from-blue-400 to-blue-600 px-8 py-4 rounded-full text-white font-semibold text-xl mr-4 transition duration-300 ease-in-out hover:from-blue-500 hover:to-blue-700"
              >
                Start Applying
              </Link>
              <Link
                to="#about"
                className="bg-white px-8 py-4 rounded-full text-blue-600 font-semibold text-xl transition duration-300 ease-in-out hover:bg-blue-100"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div
        className="bg-gradient-to-r from-003C43 to-135D66 text-black "
        id="about"
      >
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-center md:justify-between mb-10">
          <div className="md:w-1/2 mb-6 md:mb-0">
            <h2 className="text-4xl font-semibold text-center md:text-left mb-10">
              About WFM
            </h2>
            <p className="text-lg leading-relaxed">
              WFM is a comprehensive staff allocation optimization application
              designed to streamline workforce management in hospitals. Our
              platform leverages advanced LLM (Location, Language, Machine
              Learning) technology to intelligently assign staff members to
              shifts, ensuring optimal coverage while minimizing labor costs.
            </p>
          </div>
          <div className="md:w-1/2 p-4">
            <img
              src="https://www.blogtyrant.com/wp-content/uploads/2019/12/best-contact-us-pages-2.png"
              alt="WFM Image"
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
      <div
        className="bg-gradient-to-r from-003C43 to-135D66 text-black"
        id="past"
      >
        <div className="container mx-auto px-4 flex items-center">
          <div className="w-1/2 p-4">
            <img
              src="https://img.freepik.com/premium-vector/victory-business-achievement-triumph-award-winning-accomplishment-leadership-success_466036-1170.jpg?w=1800"
              alt="Past Achievements"
              className="max-w-full h-auto"
            />
          </div>
          <div className="w-1/2">
            <h2 className="text-4xl font-semibold mb-10">Past Achievements</h2>
            <p className="text-lg leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at
              scelerisque urna, nec placerat ex. Fusce tincidunt interdum ipsum
              nec lobortis. Morbi consequat metus nec nulla convallis, vel
              volutpat mauris pellentesque. Aliquam nec sapien a erat finibus
              fermentum sit amet nec odio. Quisque consequat magna in consequat
              eleifend. Suspendisse ac aliquet sapien, vel mollis est.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeComponent;
