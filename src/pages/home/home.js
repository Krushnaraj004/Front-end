/* eslint-disable no-sequences */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */

import React, { useEffect,useState,useContext} from "react";
import axios from "axios";
import icon1 from '../../img/icon-1.png';
import icon2 from '../../img/icon-2.png';
import icon3 from '../../img/icon-3.png';
import side from '../../img/side.jpg';
import userDataContext from "../../Token.context";

import Card from './Card';

const Home = () => {
    const [productsData,setproductsData] = useState([]);
    const userData = useContext(userDataContext);
    useEffect(() => {
        getproductsApi();
    }, []);

    const getproductsApi = async () => {
        const token = JSON.parse(localStorage.getItem("token"));
        // console.log("token", token);
        //http://localhost:4000
        try {
            const response = await axios.get("https://honey-wish.herokuapp.com/get/user/Product",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            // console.log("response>=", response);
            setproductsData(response.data.data);  
            // console.log("productData", productsData);
        }
        catch (error) {
            console.log("error", error);
            // alert(error.response.data.error);
        }
    }
  return (
    <div>
          <div className="Navbar">
          </div>
          <h1 className="text1">Our Honey Category</h1>
          <div className="cont">
              <div className="inner1">
                  <div>
                      <img src={icon1} width="150" height="120"></img>
                      <p>Queen Bee Honey</p>
                  </div>
                  <br />
                  <div>
                      <img src={icon2} width="150" height="120"></img>
                      <p>Sunflower Honey</p>
                  </div>
                  <br />
                  <div>
                      <img src={icon3} width="150" height="120"></img>
                      <p>Manuka Honey</p>
                  </div>
              </div>
              <div className="inner2">
                  <img src={side} width="500px" height="800px"></img>
              </div>
          </div>
          <h2 className="text1">100% Fresh Honey Product</h2>
          <div className="maincard" className="row d-flex p-2 ">
              <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css" rel="stylesheet" style={{ textDecoration: 'none', color: 'white' }} />
              <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
              <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/js/bootstrap.min.js"></script>
                  {productsData && productsData.length !== 0
                      ? productsData.map((item) => {
                          return <Card key={item._id} productsData={item}/>;
                      })
                  : "No data"}     
          </div>
          <br/>
    </div>
  );
};

export default Home;
 