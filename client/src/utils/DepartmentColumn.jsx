import { useNavigate } from "react-router-dom"


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
]

export const DepartmentButtons = ({_id}) => {
    const navigate = useNavigate();
    return (
        <div className="action_buttons">
            <button className="update_btn"
                onClick={() => navigate(`/admin-dashboard/department/${_id}`)}
            >Update</button>
            <button className="delete_btn">Delete</button>
        </div>
    )
}

