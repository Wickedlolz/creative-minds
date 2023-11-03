import { ToastContainer } from "react-toastify";
import { LayoutProps } from "../types";

import Nav from "./Nav";

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="mx-6 md:max-w-2xl md:mx-auto">
      <Nav />
      <main>{children}</main>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export default Layout;
