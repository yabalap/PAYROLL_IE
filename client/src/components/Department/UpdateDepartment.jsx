import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import '../../App.css';  

const UpdateDepartment = () => {
    const {id} = useParams()
    const [department, setDepartment ] = useState([])
    const [depLoading, setDepLoading] = useState(false)
    const navigate = useNavigate();


    useEffect(() => {
    const fetchDepartments = async () => {
            setDepLoading(true);
            try {
        
                const response = await axios.get(`http://localhost:5000/api/department/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`

                    }
                });

                if (response.data.success) {
                    setDepartment(response.data.department)
                }

            } catch (error) {
                const errMsg = error.response?.data?.error || "Something went wrong while fetching departments.";
                alert(errMsg);
            } finally {
                setDepLoading(false);
            }
        };

        fetchDepartments();
    }, []);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setDepartment({...department, [name] : value})

    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.put(`http://localhost:5000/api/department/${id}` , department, {
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
        <>{depLoading ? <div>Loading.........</div> :
        <div className="container"> 
            <div className="form_container">
                    <form onSubmit={handleSubmit}
                    className="department_form">
                    <h3 className="txt_department">Update Department</h3>
                        <div>
                            <label htmlFor="dep_name">Department Name</label>
                            <input 
                            value={department.dep_name}
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
                            value={department.description}
                            name="description" 
                            placeholder="Description" className="txt_area"
                            onChange={handleChange}
                            required
                            >
                            </textarea>
                        </div>
                        <button name="btn_add">Update Department</button>
                    </form>
            </div>
        </div>  }</>
          )
}

export default UpdateDepartment
