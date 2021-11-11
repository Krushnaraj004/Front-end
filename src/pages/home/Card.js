/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import ebutton from "../../img/edit.png";
import { toast } from 'react-toastify';

const Card = ({ productsData}) => {
    // console.log('productsData: ', productsData);
   
    const history = useHistory();
    const [checkLogin, setCheckLogin] = useState(null);

    useEffect(() => {
        setCheckLogin(JSON.parse(localStorage.getItem("token")));
    }, []);

    const addToWishlist = async (_id) => {
        if (!checkLogin) return history.push("/login");
        //api call
        //http://localhost:4000
        try {
            const response = await axios.post(
                "https://honey-wish.herokuapp.com/api/add/wishlist",
                {
                    ProductId: _id,
                },
                {
                    headers: {
                        Authorization: `Bearer ${checkLogin}`,
                    },
                }
            );
            // console.log("wishresponse: ", response);
            toast.success("Add to Wishlist Successfully", {
            })
            history.push("/wishlist");
        } catch (error) {
            console.log("error: ", error);
            toast.success("Unable Add to Wishlist", {
            })
            // alert(error.response.data.error);
        }
    };
    const placeOrder = async (_id) => {
        if (!checkLogin) return history.push("/login");

        //api call
        //http://localhost:4000
        try {
            const response = await axios.post(
                "https://honey-wish.herokuapp.com/api/add/order",
                {
                    ProductId: _id,
                    orderDate: Date.now(),
                    transactionId: uuidv4(),
                    address: null,
                    user: JSON.parse(localStorage.getItem("userDetails"))._id,
                },
                {
                    headers: {
                        Authorization: `Bearer ${checkLogin}`,
                    },
                }
            );
            // console.log("addrresponse: ", response);
            toast.success("Order Placed Successfully", {
            })
        } catch (error) {
            console.log("error: ", error);
            // alert(error.response.data.error);
            toast.success("Unable to Place Order", {
            })
        }
    };
    
    return (
        productsData && (
            <div className="cardbox">
                <div>
                    <img
                        src={
                            productsData.Picture
                                ? productsData.Picture
                                : ebutton
                        }
                        width="200"
                        height="200"
                    />
                   <h5>Name : {productsData.ProductName}</h5>
                    <p>
                        Description : {productsData.Description}
                    </p>
                    <p>Price : {productsData.Price}</p>
                   
                    <button
                        className="btn1"
                        onClick={() => {
                            addToWishlist(productsData._id);

                        }}>
                        Add to wishlist
                    </button>
                    <br/><br/>
                    <button
                        className="btn2"
                        onClick={() => {
                            placeOrder(productsData._id);
                        }}>
                        Buy now
                    </button>
                    <br/><br/>
                </div>
                <br/><br/>
            </div>
           
        )
    ); 
};
export default Card;


