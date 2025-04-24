import React from "react";

const AddEmployee = () => {

    return(
            <div className="form_container">
                    <form 
                    className="employee_form">

                    <h3 className="title_employee">Add Employee</h3>

                        {/* First Name*/}
                        <div>
                            <label className="txt_employee">First Name</label>
                            <input 
                            type="text" 
                            name="firstName"
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
                            placeholder="Date of Birth"
                            required
                            />
                        </div>

                        {/* Gender*/}
                        <div>
                            <label className="txt_employee">Gender</label>
                            
                            <select
                            name="gender"
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
                            placeholder="Position"
                            required
                            />
                        </div>

                        {/* Department*/}
                        <div>
                            <label className="txt_employee">Department</label>      
                        <select
                            name="department"
                            required>

                        <option value="">Select Department</option>
                        </select>
                        </div>

                        {/* Salary*/}
                        <div>
                            <label className="txt_employee">Salary</label>
                            <input 
                            type="number" 
                            name="salary"
                            placeholder="Salary"
                            required
                            />
                        </div>    

                        {/* Password*/}
                        <div>
                            <label className="txt_employee">Password</label>
                            <input 
                            type="password" 
                            name="password"
                            placeholder="Enter Password"
                            required
                            />
                        </div>    

                        {/* Role Access*/}
                        <div>
                            <label className="txt_employee">Role</label>
                            
                            <select
                            name="role"
                            required>
                                <option value="">Select Role</option>
                                <option value="admin">Admin</option>
                                <option value="employee">Employee</option>
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
                                accept="image/*"
                                hidden
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
