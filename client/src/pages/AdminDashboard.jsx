import React from "react";
import { useAuth } from "../context/authContext";

const AdminDashboard = () => {
    const {user, loading} = useAuth()

    if(loading ){
        return <div>Loading.........</div>
    }
    if(!user){
        navigate('/')
    }
    return(
        <div> AdminDssashboard {user && user.name}</div>
    )
}

export default AdminDashboard
