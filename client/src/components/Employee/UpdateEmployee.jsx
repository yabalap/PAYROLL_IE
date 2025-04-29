import React, { useEffect, useState } from "react";
import { fetchDepartments } from "../../utils/EmployeeColumn";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "../../css/AdminCSS/employeeAdd.css";
import "../../App.css";

const UpdateEmployee = () => {
    const navigate = useNavigate();
    const [employee, setEmployee] = useState({
        firstName: "",
        middleName: "",
        lastName: "",
        maritalStatus: "",
        position: "",
        department: "",
        salaryDay: 0,
        salaryMon: 0,
        role: ""
    });
    const { id } = useParams();  // Get the employee ID from URL params
    const [departments, setDepartments] = useState(null);

    useEffect(() => {
        const getDepartments = async () => {
            const departments = await fetchDepartments();
            setDepartments(departments);
        };
        getDepartments();
    }, []);

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/employee/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });

                if (response.data.success) {
                    const employee = response.data.employee;
                    const fullName = employee.userId.name.split(" ");
                    const firstName = fullName[0];
                    const middleName = fullName.length === 3 ? fullName[1] : "";
                    const lastName = fullName[fullName.length - 1];

                    setEmployee((prev) => ({
                        ...prev,
                        firstName,
                        middleName,
                        lastName,
                        maritalStatus: employee.maritalStatus,
                        position: employee.position,
                        department: employee.department,
                        salaryDay: employee.salaryDay,
                        salaryMon: employee.salaryMon,
                        role: employee.role
                    }));
                }
            } catch (error) {
                alert("Error fetching employee data.");
            }
        };

        fetchEmployee();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.put(
                `http://localhost:5000/api/employee/${id}`,
                employee,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );

            if (response.data.success) {
                navigate("/admin-dashboard/employeeadmin");
            }
        } catch (error) {
            const errMsg = error.response?.data?.error || "Something went wrong while updating employee.";
            alert(errMsg);
        }
    };

    return (
        <>
            {departments && employee ? (
                <div className="form_container">
                    <form onSubmit={handleSubmit} className="employee_form">
                        <h3 className="title_employee">Edit Employee</h3>

                        {/* First Name */}
                        <div>
                            <label className="txt_employee">First Name</label>
                            <input
                                type="text"
                                name="firstName"
                                value={employee.firstName}
                                onChange={handleChange}
                                placeholder="Enter First Name"
                            />
                        </div>

                        {/* Middle Name */}
                        <div>
                            <label className="txt_employee">Middle Name</label>
                            <input
                                type="text"
                                name="middleName"
                                value={employee.middleName}
                                onChange={handleChange}
                                placeholder="Enter Middle Name"
                            />
                        </div>

                        {/* Last Name */}
                        <div>
                            <label className="txt_employee">Last Name</label>
                            <input
                                type="text"
                                name="lastName"
                                value={employee.lastName}
                                onChange={handleChange}
                                placeholder="Enter Last Name"
                            />
                        </div>

                        {/* Marital Status */}
                        <div>
                            <label className="txt_employee">Marital Status</label>
                            <select
                                name="maritalStatus"
                                value={employee.maritalStatus}
                                onChange={handleChange}
                            >
                                <option value="">Select Status</option>
                                <option value="single">Single</option>
                                <option value="married">Married</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        {/* Position */}
                        <div>
                            <label className="txt_employee">Position</label>
                            <input
                                type="text"
                                name="position"
                                value={employee.position}
                                onChange={handleChange}
                                placeholder="Position"
                            />
                        </div>

                        {/* Department */}
                        <div>
                            <label className="txt_employee">Department</label>
                            <select
                                name="department"
                                value={employee.department}
                                onChange={handleChange}
                            >
                                <option value="">Select Department</option>
                                {departments.map((dep) => (
                                    <option key={dep._id} value={dep._id}>
                                        {dep.dep_name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Role */}
                        <div>
                            <label className="txt_employee">Position</label>
                            <select
                                name="role"
                                value={employee.role}
                                onChange={handleChange}
                            >
                                <option value="">Select Role</option>
                                <option value="admin">Admin</option>
                                <option value="employee">Employee</option>
                                <option value="contractual">Contractual</option>
                            </select>
                        </div>

                        {/* Salary */}
                        <div>
                            <label className="txt_employee">Salary</label>
                            <input
                                type="number"
                                name="salaryMon"
                                value={employee.salaryMon}
                                onChange={handleChange}
                                placeholder="Enter Salary ( Enter 0 if N/A )"
                                
                            />
                        </div>

                        {/* Salary per Day */}
                        <div>
                            <label className="txt_employee">Salary per Day</label>
                            <input
                                type="number"
                                name="salaryDay"
                                value={employee.salaryDay}
                                onChange={handleChange}
                                placeholder="Enter Salary per Day ( Enter 0 if N/A )"
                                
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="btn_wrapper">
                            <button name="btn_add">Update Employee</button>
                        </div>
                    </form>
                </div>
            ) : (
                <div>Loading...</div>
            )}
        </>
    );
};

export default UpdateEmployee;
