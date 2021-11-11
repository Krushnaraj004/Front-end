import React from "react";
import Home from "./pages/home/home";
import Login from "./pages/SignUp/Login";
import Signup from "./pages/SignIn/SignIn";
import { Route, Switch } from "react-router-dom";
import Order from "./pages/order/Order";
import Wishlist from "./pages/Wishlist/Wishlist";
import AdminHome from "./pages/admin-home/Admin-home";


const PrimaryRoutes = () => {
    return (
        <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/orders" component={Order} />
            <Route path="/wishlist" component={Wishlist} />
            <Route path="/admin/home" component={AdminHome} />
        </Switch>
    );
};

export default PrimaryRoutes;
