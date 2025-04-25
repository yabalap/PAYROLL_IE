import axios from 'axios';


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
