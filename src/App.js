import React, { useEffect, useState, useContext} from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import PrimaryRoutes from "./primary-routes";
import Footer from "./footer";
import Header from "./Header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserDataContext from "./Token.context";
toast.configure();

function App() {
  const [data1, setdata1] = useState({
    userData: "",
    auth: false,
    token: ''
  });

  useEffect(() => {
    if (data1.auth) {
      setdata1({
        ...data1,
        ["auth"]: true,
        ["userData"]: JSON.parse(localStorage.getItem("userDetails")),
        ["token"]: JSON.parse(localStorage.getItem("token")),
      });
    } else if (localStorage.getItem("userDetails")) {
      setdata1({
        ...data1,
        ["auth"]: true,
        ["userData"]: JSON.parse(localStorage.getItem("userDetails")),
        ["token"]: JSON.parse(localStorage.getItem("token")),
      });
    }
   }, []);
  
  return (
    <div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <BrowserRouter>
        <UserDataContext.Provider
          value={{
           data1,
            setdata1,
          }}
        >
          <Header />
          <PrimaryRoutes />
          <Footer />
        </UserDataContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
