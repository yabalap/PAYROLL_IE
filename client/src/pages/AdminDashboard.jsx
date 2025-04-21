import React from "react";
import { useAuth } from "../context/authContext";

import { FaUsers } from "react-icons/fa";
import { FaRegBuilding } from "react-icons/fa";
import { RiFilePaper2Fill } from "react-icons/ri";

import '../css/admindashboard.css'

const AdminDashboard = () => {
    const {user, loading} = useAuth()

    if(loading ){
        return <div>Loading.........</div>
    }
    if(!user){
        navigate('/')
    }
    return(
    
    <div className="Total">   

        <div className="TotalContainer">
            <div className="card">
                <div className="card-content">
                    <div className="text-content">
                        <p className="totaltxt">121</p>
                        <p className="total_employee">Total Employees</p>

                    </div>
                    <div className="icon">
                        <FaUsers className="admin_icon"/>
                    </div>
                </div>
            </div>
        </div>

        <div className="TotalContainer">
            <div className="card">
                <div className="card-content">
                    <div className="text-content">
                        <p className="totaltxt">121</p>
                        <p className="total_department">Total Department</p>

                    </div>
                    <div className="icon">
                        <FaRegBuilding className="admin_icon"/>
                    </div>
                </div>
            </div>
        </div>

        <div className="TotalContainer">
            <div className="card">
                <div className="card-content">
                    <div className="text-content">
                        <p className="totaltxt">121</p>
                        <p className="totat_payslip">Total Payslip</p>

                    </div>
                    <div className="icon">
                    <RiFilePaper2Fill className="admin_icon"/>
                    </div>
                </div>
            </div>
        </div>
        
    </div>

    )
}

export default AdminDashboard
