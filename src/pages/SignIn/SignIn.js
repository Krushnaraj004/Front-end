/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React ,{useState} from "react";
import { useHistory } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";
const SignIn = () => {

    const history = useHistory();//route in different component

    const [userDetails, setDetails] = useState({
        Email: "",
        Password: "",
        Name: "",
        Contact: "",
    });

    const handleSigninChange = (e) => {
        const { name, value } = e.target;//object Destructor
        setDetails({ ...userDetails, [name]: value });
    };

    const [isLoading, setIsLoading] = useState(false);
    const SigninApi = async () => {
        setIsLoading(true);
        // console.log("userDetails", userDetails);
        try {
            const response = await axios.post("http://localhost:4000/api/signup?isAdmin=false", userDetails);
            setIsLoading(false);
            toast.success("SignUp Successfully", {
            })
            console.log("response", response);

            history.push("/login");
        }
        catch (error) {
            console.log("error", error);
            toast.success("Unable to SignUp", {
            })
        }
    };
    return (
        <div>
            <br></br>
            <div className="mainbox2">
                <div className="boxu1">
                    <h2 className="t1">SignUp</h2>
                    <label className="textbaru1">Name</label> 
                    <div className="textbaru1">
                        <input onChange={handleSigninChange} className="textbaru1" type="text" name="Name" />
                        </div>
                    <br />
                    <label className="textbaru2">Email</label>
                    <div className="textbaru2">
                        <input type="text" className="textbaru2" onChange={handleSigninChange} name="Email" />
                    </div>
                    <br/>
                    <label className="textbaru3">Password</label>
                    <div className="textbaru3">
                        <input type="Password" className="textbaru3" onChange={handleSigninChange} name="Password" />
                    </div>
                    <br />
                    <label className="textbaru4">Phone no</label>
                    <div className="textbaru4">
                        <input type="text" className="textbaru4" onChange={handleSigninChange} name="Contact" />
                    </div>
                    <br />
                    <div className="textbaru5">
                        <input type="submit" disabled={isLoading} className="button1" value="SignUp" onClick={SigninApi} />
                        {isLoading && (
                            <div class="spinner-border" role="status">
                                <span class="sr-only"></span>
                            </div>
                        )}
                    </div>
                    <br />
                </div>
                <div className="boxu2">
                    <h2 className="tl2">Welcome To SignUp</h2>
                </div>
            </div>
            <br /><br />
            <br /><br />
            <br /><br />
            <br /><br />
            <br /><br />
            <br /><br />
        </div>
    );
};

export default SignIn;
