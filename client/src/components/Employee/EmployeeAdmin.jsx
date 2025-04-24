import React from "react";
import { Link } from "react-router-dom";
import '../../css/AdminCSS/employeeadmin.css';

const EmployeeAdmin = () => {

    return(
        <div className="container">
            <div className="txt_department">
                <h3>Manage Employees</h3>
            </div>

            <div className="search_add">
                <input
                    type="text"
                    placeholder="Search by Department Name"
                    className="txt_search"
                />
                <Link to="/admin-dashboard/add-employee" className="txt_add">
                    Add New Employee
                </Link>
            </div>


        </div>
    )
}

export default EmployeeAdmin
