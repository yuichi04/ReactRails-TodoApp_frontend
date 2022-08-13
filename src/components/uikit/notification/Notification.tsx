import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // デフォルト色の変更は _variables.scssで行う

const Notification: React.FC = () => {
  return <ToastContainer />;
};

export default Notification;
