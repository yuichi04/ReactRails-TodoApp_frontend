import { toast } from "react-toastify";

export const notification = (text: string) => {
  return toast.success(text, {
    position: "top-right",
    autoClose: 800,
    hideProgressBar: false,
    pauseOnHover: true,
    draggable: false,
    theme: "dark",
  });
};
