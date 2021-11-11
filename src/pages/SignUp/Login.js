import axios from "axios";
import React, { useState,useContext} from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import userDataContext from "../../Token.context";

const Login = () => {

  const {data1, setdata1} = useContext(userDataContext);
  console.log("userDataContext", data1);
  console.log("setdata1", setdata1);
  const history = useHistory();//route in different component

  const [userDetails, setDetails] = useState({
    Email: "",
    Password: "",
  });

  const handleLoginChange = (e) => {
    const { name, value } = e.target;//object Destructor
    setDetails({ ...userDetails, [name]: value });
  };

    const [isLoading,setIsLoading]=useState(false);

  const loginApi = async () => {

  
    try {
      setIsLoading(true);
      const response = await axios.post
        ("http://localhost:4000/api/signin", userDetails);

      setIsLoading(false);
      toast.success("Login Successfully", {
      })
      console.log("response=>", response.data.data.token);
      localStorage.setItem("userDetails", 
        JSON.stringify(response.data.data.user));// to save in localstorage
      
      localStorage.setItem("token", 
      JSON.stringify(response.data.data.token));
    

      setdata1({
        ...data1,
        userData: response.data.data.user,
        auth: true,
        token: response.data.data.token
      });
      if (response.data.data.user.role === "ADMIN") {
        history.push("/admin/home");
      }
      else {
        history.push("/");
      }
    }
    catch (error) {
      setIsLoading(false);
      toast.success("Unable to Login", {
      })
      console.log("error", error);
    }
  };
  return (
    <div>  
    <br></br>
    <div className="mainbox">
        <div className="boxl1">
          <h2 className="t1">Login</h2>
          <label className="textbar1">Email</label>
          <div className="textbar1">
            <input type="text" className="textbar1" onChange={handleLoginChange} name="Email" />
          </div>
          <br></br>
          <label className="textbar2">Password</label>
          <div className="textbar2">
            <input type="Password" className="textbar2" onChange={handleLoginChange} name="Password" />
          </div>
          <br />
          <div className="textbar3">
            <input type="submit" disabled={isLoading} className="button" value="Login" onClick={loginApi} />
            {isLoading && (
              <div class="spinner-border" role="status">
                <span class="sr-only"></span>
              </div>
            )}
          </div>
          <br />
        </div>
        <div className="boxl2">
          <h2 className="t2">Welcome To Login</h2>
        </div>
    </div>
      <br/>
    </div>
  );
};

export default Login;
