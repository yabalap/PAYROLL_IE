import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import '../../css/AdminCSS/employeeView.css';
const ViewEmployee = () => {
    const { id } = useParams(); // Get employee ID from URL params
    const [employee, setEmployee] = useState(null);

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                // Fetch employee data using the ID
                const response = await axios.get(`http://localhost:5000/api/employee/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });

                if (response.data.success) {
                    setEmployee(response.data.employee); // Set employee state
                } 
            } catch (error) {
                const errMsg = error.response?.data?.error || "Something went wrong while fetching employee data.";
                alert(errMsg);
            }
        };

        fetchEmployee(); // Fetch employee data when component mounts
    }, [id]); // Add id as a dependency to refetch when it changes

    return (
        <>{employee ? (
            <div className="employee_containers">
            <div className="view_employee">
                {employee ? (
                    <div className="employee_details">
                        <div className="profile_image">
                            {/* Check if there is a profile image, if not, display a note */}
                            {employee.userId.profileImage ? (
                                <img src={`http://localhost:5000/${employee.userId.profileImage}`} alt="Employee Profile" />
                            ) : (
                                <p>No picture uploaded yet</p>
                            )}
                        </div>

                        <div className="employee_info">
                            <div className="view_con">
                                <p className="view_txt">Name: </p>
                                <p className="view_info">{employee.userId.name}</p>
                            </div>

                            <div className="view_con">
                                <p className="view_txt">Employee ID: </p>
                                <p className="view_info">{employee.employeeID}</p>
                            </div>  

                            <div className="view_con">
                                <p className="view_txt">Date of Birth: </p>
                                <p className="view_info">{new Date(employee.dob).toLocaleDateString()}</p>
                            </div>

                            <div className="view_con">
                                <p className="view_txt">Gender: </p>
                                <p className="view_info">{employee.gender}</p>
                            </div>

                            <div className="view_con">
                                <p className="view_txt">Marital Status: </p>
                                <p className="view_info">{employee.maritalStatus}</p>
                            </div>

                            <div className="view_con">
                                <p className="view_txt">Position: </p>
                                <p className="view_info">{employee.position}</p>
                            </div>

                            <div className="view_con">
                                <p className="view_txt">Department: </p>
                                <p className="view_info">{employee.department.dep_name}</p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div>Loading...</div>
                )}
            </div>
        </div>
        ) : <div>Loading...</div>}</>
    );
};

export default ViewEmployee;
