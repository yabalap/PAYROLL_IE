// AdminDashboard.js
import React, { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom"; // Import the navigate hook
import { FaUsers } from "react-icons/fa";
import { FaRegBuilding } from "react-icons/fa";
import { RiFilePaper2Fill } from "react-icons/ri";
import { FaPlaneDeparture } from "react-icons/fa";
import { FaRegClock } from "react-icons/fa";

import AdminCard from './AdminCard'; // Import the Card component
import '../../css/AdminCSS/admindashboard.css';

const DashboardAdmin = () => {
    const { user, loading } = useAuth();
    const navigate = useNavigate(); // Use the navigate hook

    // Loading state
    if (loading) {
        return <div>Loading.........</div>;
    }

    // Redirect if not logged in
    useEffect(() => {
        if (!user) {
            navigate('/');
        }
    }, [user, navigate]);

    // Data for cards
    const employee = 92;
    const department = 6;
    const payslip = 23;
    const leave = 6;
    const ot = 4;

    return (
        <div className="Total">
            {/* Main Totals */}
            <AdminCard title="Employees" count={employee} icon={FaUsers} />
            <AdminCard title="Departments" count={department} icon={FaRegBuilding} />
            <AdminCard title="Payslips" count={payslip} icon={RiFilePaper2Fill} />

            {/* Pending Leave and OT in separate cards */}
            <div className="cards pending-combined">

    <div className="combined-header">Pending Requests</div>

    
    <div className="combined-items">
        <div className="pending-item">
            <FaPlaneDeparture className="admin_icons" />
            <div className="pending-text">
                <p className="totaltxt-small">{leave}</p>
                <p className="pending-label">Pending Leave</p>
            </div>
        </div>
        <div className="pending-item">
            <FaRegClock className="admin_icons" />
            <div className="pending-text">
                <p className="totaltxt-small">{ot}</p>
                <p className="pending-label">Pending OT</p>
            </div>
        </div>
    </div>
</div>
        </div>

    );
};

export default DashboardAdmin;
