import React from "react";
import { Link } from "react-router-dom";
import '../../css/EmployeeCSS/employeeLeave.css';

const LeaveEmployee = () => {    

    return(
        <div className="container"> 
            <div className="txt_department">
                <h3>Manage Leaves</h3>
            </div>

            <div className="search_add">
                        <input
                            type="text"
                            placeholder="Search Leave"
                            className="txt_search"
                        />
                        <Link to="/employee-dashboard/add-leave" className="txt_add">
                            Add New Leave
                        </Link>
            </div>

        </div>



    )
}

export default LeaveEmployee
