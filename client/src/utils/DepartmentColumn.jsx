import { useNavigate } from "react-router-dom";
import axios from "axios";

// Table columns
export const columns = [
    {
        name: "No",
        selector: (row) => row.sno
    },
    {
        name: "Department Name",
        selector: (row) => row.dep_name
    },
    {
        name: "Action",
        selector: (row) => row.action
    }
];

// Action buttons for each row
export const DepartmentButtons = ({ _id, onDepartmentDelete }) => {
    const navigate = useNavigate();

    const handleDelete = async (id) => {
        const confirm = window.confirm("Do you want to delete?");
        if (confirm) {
            try {
                const response = await axios.delete(`http://localhost:5000/api/department/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });

                if (response.data.success) {
                    onDepartmentDelete(id);
                }
            } catch (error) {
                const errMsg = error.response?.data?.error || "Something went wrong while deleting department.";
                alert(errMsg);
            }
        }
    };

    return (
        <div className="action_buttons">
            <button
                className="update_btn"
                onClick={() => navigate(`/admin-dashboard/department/${_id}`)}
            >
                Update
            </button>
            <button
                className="delete_btn"
                onClick={() => handleDelete(_id)}
            >
                Delete
            </button>
        </div>
    );
};
