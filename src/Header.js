import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import userDataContext from "./Token.context";
import main from './img/main.png';
import { toast } from 'react-toastify';

const Header = () => {
    const {data1, setdata1} = useContext(userDataContext);
    // console.log("userData: ", userData);
    const history = useHistory();
    // let [clear, setClear] = useState(false);
    
    // let k = JSON.parse(localStorage.getItem("token"));
    // useEffect(() => {
    //     // console.log("calling");
    //     setClear(true);  
    // }, [JSON.parse(localStorage.getItem("token"))]);

    // console.log(JSON.parse(localStorage.getItem("userDetails")));
    
    return (
        <nav className="Navbar1">
                <Link to="/">
                    <img src={main} className="logo" width="100" height="80"></img>
                </Link>
            {data1.auth && data1.userData.role !== "ADMIN" && (
                            <div>
                  <Link className="nav1" to="/orders" style={{ textDecoration: 'none', color: 'Red' }}>
                                    Orders
                              </Link>
                    <Link className="nav2" to="/wishlist" style={{ textDecoration: 'none', color: 'Red' }}>
                                    Wishlist
                                </Link>
                            </div>
                        )}

            {!data1.auth &&  (
                            <div>
                                {" "}
                    <Link className="nav4" to="/login" style={{ textDecoration: 'none', color: 'Red' }}>
                                    Login
                                </Link>
                    <Link className="nav5" to="/signup" style={{ textDecoration: 'none', color: 'Red' }}>
                                    Signup
                                </Link>
                            </div>
                        )}

            { data1.userData.role === "ADMIN" &&  ( 
                <Link className="nav6" to="/admin/home" style={{ textDecoration: 'none', color: 'Red' }}>
                                    Admin
                                </Link>
                            )}
            {data1.auth && (
                            <a
                    style={{ textDecoration: 'none', color: 'Red' }}
                                className="nav7"
                                onClick={() => {
                                 localStorage.clear();
                                    // setClear(true);
                                    setdata1({
                                        ...data1,
                                        userData: "",
                                        auth: false,
                                        token: ""
                                    });
                                    history.push("/login");
                                    toast.success("LogOut Successfully", {
                                    })
                                }}
                            >
                                Logout
                            </a>
                        )}
        </nav>
    );
};

export default Header;
