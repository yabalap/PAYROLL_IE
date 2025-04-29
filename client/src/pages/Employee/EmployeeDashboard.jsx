import React, { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom"; // Outlet for nested routes

const EmployeeDashboard = () => {
    const { user, loading } = useAuth();
    const navigate = useNavigate();

    // Effect to handle redirection based on user authentication state
    useEffect(() => {
        if (!loading && !user) {
            navigate('/login'); // Redirect to login page if user is not authenticated
        }
    }, [loading, user, navigate]);

    // Show loading state while the authentication status is being determined
    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {/* Render the nested routes, based on current route */}
            <Outlet />
        </div>
    );
};

export default EmployeeDashboard;
