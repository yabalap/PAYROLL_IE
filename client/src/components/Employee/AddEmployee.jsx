import React, { useEffect, useState } from "react";
import { fetchDepartments } from "../../utils/EmployeeColumn";
import axios from 'axios';
import { useNavigate} from "react-router-dom"
import '../../css/AdminCSS/employeeAdd.css';

const AddEmployee = () => {


    const navigate = useNavigate();
    const [formData, setFormData] = useState({});

    const [departments, setDepartments] = useState([])
    useEffect(() => {
        const getDepartments = async () =>{
        const departments = await fetchDepartments();
        setDepartments(departments)
        }
        getDepartments()
    }, [])

    const handleChange = (e) => {
        const {name, value, files} = e.target
        if(name === "image") {
            setFormData((prevData) => ({...prevData, [name] : files[0]}))
        } else{
            setFormData((prevData) => ({...prevData, [name] : value}))
        }
    }

    const handleSubmit =  async (e) => {

        e.preventDefault()

        const formDataObj = new FormData()
        Object.keys(formData).forEach((key) => {
            formDataObj.append(key, formData[key]);
        });
        

        try {
            const response = await axios.post('http://localhost:5000/api/employee/add' , 
                formDataObj, {
                headers: {
                    "Authorization" : `Bearer ${localStorage.getItem('token')}`
                }
            })
            if(response.data.success){
                navigate("/admin-dashboard/employeeadmin")
            
            }
        } catch (error) {
            if(error.response && !error.response.data.error){
                alert(error.response.data.error)
            }
        }
    
    }
    return(
            <div className="form_container">
                    <form onSubmit={handleSubmit}
                    className="employee_form">

                    <h3 className="title_employee">Add Employee</h3>

                        {/* First Name*/}
                        <div>
                            <label className="txt_employee">First Name</label>
                            <input 
                            type="text" 
                            name="firstName"
                            onChange={handleChange}
                            placeholder="Enter First Name"
                            required
                            />
                        </div>

                        {/* Middle Name*/}
                        <div>
                            <label className="txt_employee">Middle Name</label>
                            <input 
                            type="text" 
                            name="middleName"
                            onChange={handleChange}
                            placeholder="Enter Middle Name"
                            required
                            />
                        </div>

                        {/* Last Name*/}
                        <div>
                            <label className="txt_employee">Last Name</label>
                            <input 
                            type="text" 
                            name="lastName"
                            onChange={handleChange}
                            placeholder="Enter Last Name"
                            required
                            />
                        </div>

                        {/* Employee ID*/}
                        <div>
                            <label className="txt_employee">Employee ID</label>
                            <input 
                            type="text" 
                            name="employeeID"
                            onChange={handleChange}
                            placeholder="Enter Employee ID"
                            required
                            />
                        </div>
   
                        {/* Email*/}
                        <div>
                            <label className="txt_employee">Email</label>
                            <input 
                            type="email" 
                            name="email"
                            onChange={handleChange}
                            placeholder="Enter Email"
                            required
                            />
                        </div>

                        {/* Date of Birth*/}
                        <div>
                            <label className="txt_employee">Date of Birth</label>
                            <input 
                            type="date" 
                            name="dob"
                            onChange={handleChange}
                            placeholder="Date of Birth"
                            required
                            />
                        </div>

                        {/* Gender*/}
                        <div>
                            <label className="txt_employee">Gender</label>
                            
                            <select
                            name="gender"
                            onChange={handleChange}
                            required>
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        {/* Marital Status*/}
                        <div>
                            <label className="txt_employee">Marital Status</label>
                            
                            <select
                            name="maritalStatus"
                            onChange={handleChange}
                            placeholder="Marital Status"
                            required>
                                <option value="">Select Status</option>
                                <option value="single">Single</option>
                                <option value="married">Married</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        {/* Position*/}
                        <div>
                            <label className="txt_employee">Position</label>
                            <input 
                            type="text" 
                            name="position"
                            onChange={handleChange}
                            placeholder="Position"
                            required
                            />
                        </div>

                        {/* Department*/}
                        <div>
                            <label className="txt_employee">Department</label>      
                        <select
                            name="department"
                            onChange={handleChange}
                            required>

                        <option value="">Select Department</option>
                        {departments.map(dep => (
                            <option key={dep._id} value={dep._id}>{dep.dep_name}</option>
                        ))}

                        </select>
                        </div>

                        {/* Salary/Monthly (Allowance included if there's*/}
                        <div>
                            <label className="txt_employee">Salary</label>
                            <input 
                            type="number" 
                            name="salaryMon"
                            onChange={handleChange}
                            placeholder="Enter Salary ( Enter 0 if N/A )"
                            required
                            />
                        </div>    

                        {/* Salary per Day*/}
                        <div>
                            <label className="txt_employee">Salary per Day</label>
                            <input 
                            type="number" 
                            name="salaryDay"
                            onChange={handleChange}
                            placeholder="Enter Salary ( Enter 0 if N/A )"
                            required
                            />
                        </div>  

                        {/* Password*/}
                        <div>
                            <label className="txt_employee">Password</label>
                            <input 
                            type="password" 
                            name="password"
                            onChange={handleChange}
                            placeholder="Enter Password"
                            required
                            />
                        </div>    

                        {/* Role Access*/}
                        <div>
                            <label className="txt_employee">Role</label>
                            
                            <select
                            name="role"
                            onChange={handleChange}
                            required>
                                <option value="">Select Role</option>
                                <option value="admin">Admin</option>
                                <option value="employee">Employee</option>
                                <option value="contractual">Contractual</option>
                            </select>
                        </div>                                                                    

                        {/* Image Upload */}
                        <div className="upload_wrapper">
                            <label className="txt_employee">Upload Image</label>
                            <label htmlFor="employee_image" className="upload_btn">Choose Image</label>
                            <input 
                                type="file" 
                                id="employee_image"
                                name="image"
                                onChange={handleChange}
                                accept="image/*"
                                
                            />

                        </div>


 
                        {/* Submit Button */}
                        <div className="btn_wrapper">
                        <button name="btn_add">Add Employee</button>
                        </div>

                    </form>
            </div>
    )
}

export default AddEmployee
