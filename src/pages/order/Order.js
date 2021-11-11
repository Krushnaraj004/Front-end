import axios from "axios";
import React, { useState, useEffect } from "react";
import dbutton from "../../img/delete.png";
import { toast } from 'react-toastify';

const Order = () => {
    const [orderData, setOrderData] = useState([]);
    
    useEffect(() => {
        getOrdersApi();
    }, []);

    useEffect(() => {
        console.log("orderData: ", orderData);
    }, [orderData]);

    //delete
    //http://localhost:4000
    const DeleteProductsApi = async (item) => {
        const token = JSON.parse(localStorage.getItem("token"));
        const itemId = item._id;
        try {
            const response = await axios.delete(`https://honey-wish.herokuapp.com/api/remove/order?_id=${itemId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log("response", response);
            getOrdersApi();
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

    //get
    const getOrdersApi = async () => {
        const token = JSON.parse(localStorage.getItem("token"));
        // console.log("token: ", token);
        //http://localhost:4000
        try {
            const response = await axios.get("https://honey-wish.herokuapp.com/api/get/order", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log("my order response: ", response); 
            console.log(response.data.data,"Data");
            setOrderData(response.data.data);
           
        } catch (error) {
            console.log("error: ", error);
            //   alert(error.response.data.error);
        }
    };
    return (
        <div>
            <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css" rel="stylesheet" style={{ textDecoration: 'none', color: 'white' }} />
            <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
            <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/js/bootstrap.min.js"></script>
            <div className="container1">
               
                    <h4>Orders</h4>
                <div className="row d-flex p-2 ">
                    {orderData && orderData.length !== 0
                        ? orderData.map((item) => {
                            return (
                                <div className="cardb2">
                                    <div className="cardb1i">
                                        &nbsp;&nbsp;
                                    <img src={item.Product.Picture} width="150" height="120"></img>
                                         <p>
                                            &nbsp;&nbsp;  <b>Name :{item.Product.ProductName}</b>
                                        </p>
                                        <p>
                                            &nbsp;&nbsp;  <b> Description :{item.Product.Description}</b>
                                        </p>
                                        <p>  &nbsp;&nbsp;  <b>Price :{item.Product.Price} </b></p>
                                        &nbsp;&nbsp;
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

export default Order;
