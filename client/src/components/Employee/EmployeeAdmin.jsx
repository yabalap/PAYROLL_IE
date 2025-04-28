import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import '../../css/AdminCSS/employeeadmin.css';
import DataTable from 'react-data-table-component';
import { columns, EmployeeButtons } from "../../utils/EmployeeColumn";
import axios from "axios";

const EmployeeAdmin = () => {
    const [employees, setEmployees] = useState([]);
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [empLoading, setEmpLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    useEffect(() => {
        const fetchEmployees = async () => {
            setEmpLoading(true);
            try {
                const response = await axios.get('http://localhost:5000/api/employee', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });

                if (response.data.success) {
                    let sno = 1;
                    const data = response.data.employees.map((emp) => ({
                        _id: emp._id,
                        sno: sno++,
                        name: emp.userId.name,
                        position: emp.position,
                        dep_name: emp.department.dep_name,
                        role: emp.userId.role,
                        action: (<EmployeeButtons _id={emp._id} />)
                    }));

                    setEmployees(data);
                    setFilteredEmployees(data); // Set the employees for initial display
                }
            } catch (error) {
                const errMsg = error.response?.data?.error || "Something went wrong while fetching employees.";
                alert(errMsg);
            } finally {
                setEmpLoading(false);
            }
        };

        fetchEmployees();
    }, []);

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        const filtered = employees.filter(emp =>
            emp.dep_name.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredEmployees(filtered);
        setCurrentPage(1); // Reset to the first page after search
    };

    const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
    const paginatedData = filteredEmployees.slice(
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
            {empLoading ? (
                <div>Loading...</div>
            ) : (
                <div className="container">
                    <div className="txt_department">
                        <h3>Manage Employees</h3>
                    </div>

                    <div className="search_add">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            placeholder="Search by Department Name"
                            className="txt_search"
                        />
                        <Link to="/admin-dashboard/add-employee" className="txt_add">
                            Add New Employee
                        </Link>
                    </div>

                    <div className='employee_table'>
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

export default EmployeeAdmin;