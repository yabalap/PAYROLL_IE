import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../css/AdminCSS/employeeadmin.css";

export const columns = [
    {
        name: "No",
        selector: (row) => row.sno,
        className: 'column-No',  // Class for styling 'No' column

    },
    {
        name: "Name",
        selector: (row) => row.name,
        sortable: true,
        className: 'column-Name',  // Class for styling 'Name' column
    },
    {
        name: "Position",
        selector: (row) => row.position,
        sortable: true,
        className: 'column-Position',  // Class for styling 'Position' column
    },
    {
        name: "Department",
        selector: (row) => row.dep_name,
        sortable: true,
        className: 'column-Department',  // Class for styling 'Department' column
    },
    {
        name: "Role",
        selector: (row) => row.role,
        sortable: true,
        className: 'column-Role',  // Class for styling 'Role' column
    },
    {
        name: "Action",
        selector: (row) => row.action,
        sortable: false,
        className: 'column-Action',  // Class for styling 'Action' column
    },
];



export const fetchDepartments = async () => {

    let departments
    try {

        const response = await axios.get('http://localhost:5000/api/department', {
            headers: {
                 Authorization: `Bearer ${localStorage.getItem("token")}` ,
                }
        });

        if (response.data.success) {
            departments = response.data.departments
        }

    } catch (error) {
        const errMsg = error.response?.data?.error || "Something went wrong while fetching departments.";
        alert(errMsg);
    }

    return departments
};
export const EmployeeButtons = ({ _id }) => {
        const navigate = useNavigate(); // Get the navigate function from useNavigate hook

    return (
        
        <div className="action_buttons">
            <button className="view_btn"
                onClick={() => navigate(`/admin-dashboard/employeeadmin/${_id}`)} // Use the _id prop here
                >View</button>
            <button className="update_btn"
                onClick={() => navigate(`/admin-dashboard/employeeadmin/update/${_id}`)} // Use the _id prop here
            >Update</button>
            <button className="pay_btn"
            
            >Payslip</button>
            <button className="delete_btn"
            
            >Leave</button>
        </div>
    );
};