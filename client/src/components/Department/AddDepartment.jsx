import React, { useState } from "react";
import '../../css/AdminCSS/departmentadmin.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../../App.css';  // Going two levels up to the src directory
const AddDepartment = () => {

    const[department, setDepartment] = useState({
        dep_name: '',
        description: ''
    })

    const navigate = useNavigate()

    const handleChange = (e) => {
        const {name, value} = e.target;
        setDepartment({...department, [name] : value})

    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post('http://localhost:5000/api/department/add' , department, {
                headers: {
                    "Authorization" : `Bearer ${localStorage.getItem('token')}`
                }
            })
            if(response.data.success){
                navigate("/admin-dashboard/departmentadmin")
            
            }
        } catch (error) {
            if(error.response && !error.response.data.error){
                alert(error.response.data.error)
            }
        }
    }
    return(
        <div className="container"> 
            <div className="form_container">
                    <form onSubmit={handleSubmit}
                    className="department_form">
                    <h3 className="txt_department">Add Department</h3>
                        <div>
                            <label htmlFor="dep_name">Department Name</label>
                            <input 
                            type="text" 
                            name="dep_name"
                            placeholder="Enter Department Name"
                            onChange={handleChange}
                            required
                            />
                        </div>
                        <div>
                            <label htmlFor="description" >Description</label>
                            <textarea 
                            name="description" 
                            placeholder="Description" className="txt_area"
                            onChange={handleChange}
                            required
                            >
                            </textarea>
                        </div>
                        <button name="btn_add">Add Department</button>
                    </form>
            </div>
        </div>
    )
}

export default AddDepartment
