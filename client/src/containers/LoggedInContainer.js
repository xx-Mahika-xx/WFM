import React, { useState } from "react";
import { useCookies } from "react-cookie";
import Stats from "../Pages/Stats";
import Approvals from "../Pages/Approvals";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

import {
  IconButton,
  List,
  ListItem,
  ListItemPrefix,
  Drawer,
  Card,
} from "@material-tailwind/react";

import {
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
} from "@heroicons/react/24/solid";

import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const LoggedInContainer = ({ children, curActiveScreen }) => {
  const [cookie] = useCookies(["token"]);
  const logout = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
    document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
    window.location.reload(true);
  };

  const [open, setOpen] = useState(false);
  const [openSettings, setOpenSettings] = useState(false);

  const onOpenModal = () => {
    setOpen(true);
    closeDrawer();
  };
  const onCloseModal = () => setOpen(false);

  const onOpenModalSetting = () => {
    setOpenSettings(true);
    closeDrawer();
  };
  const onCloseModalSetting = () => setOpenSettings(false);

  const [currentPage, setCurrentPage] = useState("stats");

  const handlePageChange = (pageName) => {
    setCurrentPage(pageName);
    closeDrawer();
  };

  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  const [openIndex, setOpenIndex] = useState(null);

  // Array of FAQs
  const faqs = [
    {
      question: "How do I apply for leave?",
      answer:
        "To apply for leave, log in to your account and navigate to the leave management section. There, you'll find an option to submit a leave request. Fill in the required details such as the start date, end date, reason for leave, and leave type, then submit the request. Once submitted, your manager will review and approve or reject the leave request accordingly.",
    },
    {
      question: "How can I check if my leave is approved?",
      answer:
        "You can check the status of your leave requests by accessing the leave management section in your account. There, you'll find a list of all your submitted leave requests along with their current status (approved, pending, or rejected). If your leave request is approved, you'll receive a confirmation notification via email or within the software interface.",
    },
    {
      question: "How do I update my work time preference?",
      answer:
        "To update your work time preference, go to the settings or profile section of your account. There, you'll find an option to set your preferred work hours. You can specify your preferred start and end times for work, as well as any other relevant preferences such as break times or flexible hours. Once updated, your preferences will be reflected in the work schedule and calendar.",
    },
    {
      question: "How can I check my work calendar?",
      answer:
        "You can view your work calendar by accessing the calendar or scheduling section of the software. There, you'll find a calendar view displaying your upcoming work schedule, including any scheduled shifts, meetings, or events. You can navigate through the calendar to view past, present, and future dates, as well as any details associated with each scheduled activity.",
    },
  ];
  // Function to toggle the open/closed state of a question
  const toggleQuestion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="h-full w-full" style={{ backgroundColor: "#FFF2E1" }}>
      <div className={"h-full w-full flex"}>
        <IconButton variant="text" size="lg" onClick={openDrawer}>
          {isDrawerOpen ? (
            <XMarkIcon className="h-8 w-8 stroke-2 text-black" />
          ) : (
            <Bars3Icon className="h-8 w-8 stroke-2 text-black" />
          )}
        </IconButton>
        <Drawer open={isDrawerOpen} onClose={closeDrawer}>
          <Card
            color="transparent"
            shadow={false}
            className="h-[calc(100vh-2rem)] w-full p-4"
          >
            <List>
              <ListItem onClick={() => handlePageChange("stats")}>
                <ListItemPrefix>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6"
                  >
                    <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75ZM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 0 1-1.875-1.875V8.625ZM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 0 1 3 19.875v-6.75Z" />
                  </svg>
                </ListItemPrefix>
                Dashboard
              </ListItem>
              <ListItem onClick={() => handlePageChange("approvals")}>
                <ListItemPrefix>
                  <InboxIcon className="h-5 w-5" />
                </ListItemPrefix>
                Approvals
              </ListItem>
              <hr className="my-2 border-blue-gray-50" />
              <ListItem onClick={onOpenModalSetting}>
                <ListItemPrefix>
                  <Cog6ToothIcon className="h-5 w-5" />
                </ListItemPrefix>
                Settings
              </ListItem>
              <ListItem onClick={onOpenModal}>
                <ListItemPrefix>
                  <UserCircleIcon className="h-5 w-5" />
                </ListItemPrefix>
                Help & Support
              </ListItem>
              <ListItem
                onClick={(e) => {
                  e.preventDefault();
                  logout();
                }}
              >
                <ListItemPrefix>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6"
                    color="red"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2.25a.75.75 0 0 1 .75.75v9a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM6.166 5.106a.75.75 0 0 1 0 1.06 8.25 8.25 0 1 0 11.668 0 .75.75 0 1 1 1.06-1.06c3.808 3.807 3.808 9.98 0 13.788-3.807 3.808-9.98 3.808-13.788 0-3.808-3.807-3.808-9.98 0-13.788a.75.75 0 0 1 1.06 0Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </ListItemPrefix>
                Log Out
              </ListItem>
            </List>
          </Card>
        </Drawer>
        <div
          className="h-full w-full overflow-auto"
          style={{ backgroundColor: "#FFF2E1" }}
        >
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
      <Modal open={open} onClose={onCloseModal} center>
        <div className="max-w-lg mx-auto py-8 px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Help and Support
          </h2>
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h3 className="text-xl font-semibold mb-4">
              Frequently Asked Questions
            </h3>
            {/* Map over the FAQs and render each question and answer */}
            {faqs.map((faq, index) => (
              <div key={index} className="mb-4">
                {/* Question */}
                <div
                  className="cursor-pointer flex justify-between items-center mb-2"
                  onClick={() => toggleQuestion(index)}
                >
                  <h4 className="text-lg font-semibold">{faq.question}</h4>
                  <svg
                    className={`w-6 h-6 ${
                      openIndex === index ? "transform rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
                {/* Answer (conditionally rendered based on open/closed state) */}
                {openIndex === index && (
                  <p className="text-gray-600">{faq.answer}</p>
                )}
              </div>
            ))}
          </div>
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <p className="mb-4">
              For further assistance, you can reach out to our support team:
            </p>
            <ul className="list-disc list-inside">
              <li className="mb-2">Email: support@example.com</li>
              <li className="mb-2">Phone: +1-123-456-7890</li>
            </ul>
          </div>
        </div>
      </Modal>
      <Modal open={openSettings} onClose={onCloseModalSetting} center>
        <div className="max-w-lg mx-auto mt-8 p-8 bg-white rounded-lg shadow-md">
          <h2 className="text-3xl font-bold mb-8 text-center text-blue-600">
            Settings
          </h2>
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-4">Profile Settings</h3>
            <div className="flex items-center mb-4">
              <label htmlFor="username" className="w-1/3">
                Username:
              </label>
              <input
                type="text"
                id="username"
                className="w-2/3 border rounded p-2 focus:outline-none focus:border-blue-400"
              />
            </div>
            <div className="flex items-center mb-4">
              <label htmlFor="email" className="w-1/3">
                Email:
              </label>
              <input
                type="email"
                id="email"
                className="w-2/3 border rounded p-2 focus:outline-none focus:border-blue-400"
              />
            </div>
          </div>
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-4">
              Notification Settings
            </h3>
            <div className="flex items-center mb-4">
              <label htmlFor="notifications" className="w-1/3">
                Enable Notifications:
              </label>
              <input
                type="checkbox"
                id="notifications"
                className="form-checkbox h-5 w-5 text-blue-600"
              />
            </div>
          </div>
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-4">Security Settings</h3>
            <div className="flex items-center mb-4">
              <label htmlFor="password" className="w-1/3">
                New Password:
              </label>
              <input
                type="password"
                id="password"
                className="w-2/3 border rounded p-2 focus:outline-none focus:border-blue-400"
              />
            </div>
            <div className="flex items-center mb-4">
              <label htmlFor="confirmPassword" className="w-1/3">
                Confirm Password:
              </label>
              <input
                type="password"
                id="confirmPassword"
                className="w-2/3 border rounded p-2 focus:outline-none focus:border-blue-400"
              />
            </div>
          </div>
          <div className="text-center">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 focus:outline-none">
              Save Changes
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default LoggedInContainer;
