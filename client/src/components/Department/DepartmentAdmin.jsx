import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import '../../css/AdminCSS/departmentadmin.css';
import DataTable from 'react-data-table-component';
import { columns , DepartmentButtons} from "../../utils/DepartmentColumn";


const DepartmentAdmin = () => {
    const [departments, setDepartments] = useState([]);
    const [depLoading, setDepLoading] = useState(false);

    useEffect(() => {
        const fetchDepartments = async () => {
            setDepLoading(true);
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    alert("No token found. Please log in again.");
                    return;
                }

                const response = await axios.get('http://localhost:5000/api/department', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (response.data.success) {
                    let sno = 1;
                    const formattedDepartments = response.data.departments.map(dep => ({
                        _id: dep._id,
                        sno: sno++,
                        dep_name: dep.dep_name,
                        action: <DepartmentButtons _id={dep._id}/>
                    }));
                    setDepartments(formattedDepartments);
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


//////////table css///////////
    const customStyles = {
        headCells: {
            style: {
                fontWeight: 'bold',
                fontSize: '16px',
                fontFamily: 'Roboto Slab'

            },
        },
        cells: {
            style: {
                fontFamily: 'Roboto Slab',
                fontSize: '14px'
            },
        },
    };
//////////table css///////////

    return (
        <>
            {depLoading ? (
                <div>Loading...</div>
            ) : (
                <div className="container">
                    <div className="txt_department">
                        <h3>Manage Departments</h3>
                    </div>

                    <div className="search_add">
                        <input
                            type="text"
                            placeholder="Search by Department Name"
                            className="txt_search"
                        />
                        <Link
                            to="/admin-dashboard/add-department"
                            className="txt_add"
                        >
                            Add Department
                        </Link>
                    </div>

                    <div className='department_table'>
                        <DataTable  
                        className='table_txt'
                        columns={columns} 
                        data={departments} 
                        customStyles={customStyles}
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default DepartmentAdmin;
