// eslint-disable-next-line
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import dbutton from "../../img/delete.png";
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from "uuid";


const Wishlist = () => {
    const [wishlistData, setWishlistData] = useState([]);
    const history = useHistory();
    useEffect(() => {
        getWishlistApi();
    }, []);

    //delete

    const DeleteProductsApi = async (item) => {
        const token = JSON.parse(localStorage.getItem("token"));       
        const itemId = item._id;
        try {
            const response = await axios.delete(`http://localhost:4000/api/remove/wishlist?_id=${itemId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            // console.log("response", response);
            getWishlistApi();
            toast.success("Deleted Successfully", {
            })
        }
        catch (error) {
            console.log("error", error);
            toast.success("Unable to Delete", {
            })
            // alert(error.response.data.error);
        }
    }
    const placeOrder = async (item) => {
        const itemId = item._id;
        const itempro = item.Product._id;
        console.log(itempro,"itemproductid");
        const token = JSON.parse(localStorage.getItem("token"));
        //api call
        try {
            const response = await axios.post(
                "http://localhost:4000/api/add/order",
                {
                    ProductId: itempro,
                    orderDate: Date.now(),
                    transactionId: uuidv4(),
                    address: null,
                    user: JSON.parse(localStorage.getItem("userDetails"))._id,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log("addrresponse: ", response);
            toast.success("Order Placed Successfully", {
            })
        } catch (error) {
            console.log("error: ", error);
            // alert(error.response.data.error);
            toast.success("Unable to Place Order", {
            })
        }
    };
    //get
    const getWishlistApi = async () => {
        const token = JSON.parse(localStorage.getItem("token"));
        if (!token) {
            return history.push("/login");
        }
        try {
            const response = await axios.get(
                "http://localhost:4000/api/get/wishlist",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log("response: ", response);
            // console.log(response.data.data);
            setWishlistData(response.data.data);
        } catch (error) {
            console.log("error: ", error);
            // alert(error.response.data.error);
        }
    };

    return (
        <div>
            <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css" rel="stylesheet" style={{ textDecoration: 'none', color: 'white' }} />
            <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
            <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/js/bootstrap.min.js"></script>

           <div className="container1" >
                    <h4>Wishlist</h4>
            
                <div className="row d-flex p-2 ">
                    {wishlistData && wishlistData.length !== 5
                        ? wishlistData.map((item) => {
            
                            return (
                                <div className="cardb1" style={{ width: "18rem" }}>
                                    <div className="card-body">
                                        &nbsp;&nbsp;
                                        <img src={item.Product.Picture} width="150" height="120"></img>
                                        &nbsp;&nbsp;  &nbsp;&nbsp;
                                        <p className="card-title">
                                            &nbsp;&nbsp;<b> Name :{item.Product.ProductName}</b>
                                        </p>
                                        <p className="card-text">
                                         &nbsp; <b>Description :{item.Product.Description}</b>
                                        </p>
                                        <p className="card-text">    &nbsp;&nbsp;
                                            <b>Price :{item.Product.Price}</b></p>
                                        <button className="button"
                                            onClick={() => {
                                                placeOrder(item);
                                            }}>
                                            Add To Orders 
                                        </button>
                                        <br /><br />
                                        <button>
                                            <img src={dbutton} onClick={() => { DeleteProductsApi(item) }} width="22" height="22" />
                                        </button>
                                        <br /><br /><br /><br />
                                    </div>
                                    <br /><br /><br /><br />
                                </div>  
                            );
                        })
                        : "No data"}
                </div>
            </div> 
        </div>
    );
};

export default Wishlist;
