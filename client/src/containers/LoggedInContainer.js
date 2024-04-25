import { useState } from "react";
import IconText from "../components/IconText";
// import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import Stats from "../Pages/Stats";
import Approvals from "../Pages/Approvals";

const LoggedInContainer = ({ children, curActiveScreen }) => {
  const [cookie] = useCookies(["token"]);
  const logout = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
    document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
    window.location.reload(true);
  };

  const LogoutComp = () => {
    return (
      <div
        className="flex items-center justify-start cursor-pointer"
        onClick={(e) => {
          e.preventDefault();
          logout();
        }}
      >
        <IconText
          iconName={"tabler:logout"}
          displayText={"Logout"}
          targetLink={"/logout"}
          color={"red"}
        />
      </div>
    );
  };

  const [currentPage, setCurrentPage] = useState("stats");

  const handlePageChange = (pageName) => {
    setCurrentPage(pageName);
  };

  return (
    <div className="h-full w-full bg-app-black">
      <div className={"h-full w-full flex"}>
        <div className="h-full w-1/5 bg-black flex flex-col justify-between pb-10">
          <div className="p-5">
            <div className="py-1">
              <IconText
                iconName={"ic:round-home"}
                displayText={"Dashboard"}
                onClick={() => handlePageChange("stats")}
                color={currentPage === "stats" ? "white" : "gray"}
              />
            </div>
            <div className="py-1">
              <IconText
                iconName={"ic:round-home"}
                displayText={"Approvals"}
                onClick={() => handlePageChange("approvals")}
                color={currentPage === "approvals" ? "white" : "gray"}
              />
            </div>
          </div>
          <div className="p-5">
            <IconText
              iconName={"ic:outline-settings"}
              displayText={"Settings"}
              // targetLink={"/settings"}
              active={curActiveScreen === "settings"}
              color={"gray"}
            />
            <IconText
              iconName={"material-symbols:help-outline"}
              displayText={"Help & Support"}
              active={curActiveScreen === "help"}
              targetLink={"/home"}
              color={"gray"}
            />
            <LogoutComp />
          </div>
        </div>
        <div className="h-full w-4/5 bg-app-black overflow-auto">
          <div className="navbar w-full h-1/10 flex items-end justify-end over pr-10 pt-10">
            <div className="flex h-full">
              <div className="w-1/4 flex justify-around h-full items-center">
                <div className="bg-white ml-10 px-4 py-2 flex items-center justify-center rounded-full font-semibold cursor-pointer">
                  {cookie?.username[0].toUpperCase()}
                </div>
              </div>
            </div>
          </div>
          <div className="content pl-10 pr-10 pb-10 overflow-auto">
            {currentPage === "stats" && <Stats />}
            {currentPage === "approvals" && <Approvals />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoggedInContainer;
