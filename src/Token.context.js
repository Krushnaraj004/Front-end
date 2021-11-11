import React from "react";

const userDataContext = React.createContext({
    userData: "",
    auth: false,
    token: ''
});//initial value 
//1=> create context
//2=> wrap top level components inside this context
//3 consume it

export default userDataContext;