import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import '../../css/AdminCSS/departmentadmin.css';
import DataTable from 'react-data-table-component';
import { columns, DepartmentButtons } from "../../utils/DepartmentColumn";
import '../../App.css';  

const DepartmentAdmin = () => {
    const [departmentList, setDepartmentList] = useState([]);
    const [filteredDepartments, setFilteredDepartments] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [depLoading, setDepLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    const onDepartmentDelete = (id) => {
        const updatedList = departmentList.filter(dep => dep._id !== id);
        setDepartmentList(updatedList);
        setFilteredDepartments(updatedList);
    };

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
                    headers: { Authorization: `Bearer ${token}` }
                });

                if (response.data.success) {
                    setDepartmentList(response.data.departments);
                    setFilteredDepartments(response.data.departments);
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

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        const filtered = departmentList.filter(dep =>
            dep.dep_name.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredDepartments(filtered);
        setCurrentPage(1);
    };

    const formattedDepartments = filteredDepartments.map((dep, index) => ({
        _id: dep._id,
        sno: index + 1,
        dep_name: dep.dep_name,
        action: <DepartmentButtons _id={dep._id} onDepartmentDelete={onDepartmentDelete} />
    }));

    const totalPages = Math.ceil(formattedDepartments.length / itemsPerPage);
    const paginatedData = formattedDepartments.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

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
        }
    };

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
                            value={searchTerm}
                            onChange={handleSearchChange}
                            placeholder="Search by Department Name"
                            className="txt_search"
                        />
                        <Link to="/admin-dashboard/add-department" className="txt_add">
                            Add Department
                        </Link>
                    </div>

                    <div className='department_table'>
                        <DataTable
                            className='table_txt'
                            columns={columns}
                            data={paginatedData}
                            customStyles={customStyles}
                            pagination={false}
                        />
                    </div>

                    <div className="pagination-container">
                        <div className="rows-per-page">
                            <label htmlFor="rowsPerPage">Rows per page:</label>
                            <select
                                id="rowsPerPage"
                                value={itemsPerPage}
                                onChange={(e) => {
                                    setItemsPerPage(parseInt(e.target.value));
                                    setCurrentPage(1);
                                }}
                            >
                                <option value={5}>5</option>
                                <option value={10}>10</option>
                                <option value={15}>15</option>
                                <option value={20}>20</option>
                            </select>
                        </div>

                        <div className="custom-pagination">
                            <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                                Previous
                            </button>
                            {Array.from({ length: totalPages }, (_, i) => (
                                <button
                                    key={i}
                                    onClick={() => handlePageChange(i + 1)}
                                    className={currentPage === i + 1 ? 'active' : ''}
                                >
                                    {i + 1}
                                </button>
                            ))}
                            <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default DepartmentAdmin;
