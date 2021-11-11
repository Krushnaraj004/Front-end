/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useEffect, useState } from "react";
import AddProductModal from "./Add-Product";
//  import EditProductModal from "./Edit-Product";
import dbutton from "../../img/delete.png";
import { toast } from "react-toastify";

const AdminHome = () => {
    const [ProductsData, setProductData] = useState([]);

    useEffect(() => {
        getProductsApi();
    }, []);

    //get
    const getProductsApi = async () => {
        const token = JSON.parse(localStorage.getItem("token"));
        // console.log("token", token);
        try {
            const response = await axios.get("http://localhost:4000/get/Product",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log("response", response);
            setProductData(response.data.data);
        }
        catch (error) {
            console.log("error", error);
            // alert(error.response.data.error);
        }
    }


    //delete

    const DeleteProductsApi = async (item) => {
        const token = JSON.parse(localStorage.getItem("token"));
        const itemId= item._id;
        try {
            const response = await axios.delete(`http://localhost:4000/remove/Product?_id=${itemId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log("response", response);
            getProductsApi();
            toast.success("Successfully Deleted", {
            })
        }
        catch (error) {
            console.log("error", error);
            toast.success("unable to Delete", {
            })
            // alert(error.response.data.error);
        }
    }
   
    //add
    const addProductApi = async ( Product, closeModal) => {
        const token = JSON.parse(localStorage.getItem("token"));
        console.log("token: ", token);

        try {
            const response = await axios.post(
                "http://localhost:4000/add/Product",
                Product,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log(Product);
            closeModal();
            toast.success("Add Successfully", {
            })
            console.log("add response: ", response);
            getProductsApi();
        } catch (error) {
            toast.success("Unable to Add", {
            })
            console.log("error: ", error);
        }
    };
    return (
        <div className="Boxcon">
            <h1 className="textb"> Products</h1>
            <br />
            <hr/>
            <div className="textb">
                <AddProductModal className="textb" addProductApi={addProductApi} />
            </div>
            <br /><br />
            <table border="2px solid black" className=
            "tablemain">
                <thead>
                    <tr className="table">
                        <th>Sr.No</th>
                        <th>ProductName</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Picture</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody className="t">
                    {
                        ProductsData && ProductsData.length !== 0 ?
                            ProductsData.map((item, index) => {
                                return (
                                    <tr className="table2">
                                        <th scope="row">{index + 1}</th>
                                        <td>{item.ProductName}</td>
                                        <td>{item.Description}</td>
                                        <td>{item.Price}</td>
                                        <td><img src={item.Picture} width="80" height="80"></img></td>
                                        &nbsp;&nbsp;
                                      
                                        <button>
                                            <img src={dbutton} onClick={()=>{DeleteProductsApi(item)}} width="22" height="22"/>
                                        </button>
                                    </tr>
                                );
                            })
                            : "No Data"}
                </tbody>
            </table>
            <br /><br />
        </div>
        
    );
};

export default AdminHome;
