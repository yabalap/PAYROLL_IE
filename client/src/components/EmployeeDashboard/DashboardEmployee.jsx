// EmployeeDashboard.js
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { FaPlaneDeparture } from "react-icons/fa";
import { FaRegClock } from "react-icons/fa";
import '../../css/EmployeeCSS/employeeDashboard.css';

const EmployeeDashboard = () => {
    const { user, loading } = useAuth();
    
    // Loading state
    if (loading) {
        return <div>Loading.........</div>;
    }

    // Data for employee-specific cards (leave, pending leave, pending OT)
    const pendingLeave = 3;
    const pendingOT = 2;

    return (
        <div className="Total">
            {/* Main Totals */}

            {/* Pending Leave and OT in separate cards */}
            <div className="cards pending-combined">
                <div className="combined-header">Pending Requests</div>
                <div className="combined-items">
                    <div className="pending-item">
                        <FaPlaneDeparture className="employee_icons" />
                        <div className="pending-text">
                            <p className="totaltxt-small">{pendingLeave}</p>
                            <p className="pending-label">Pending Leave</p>
                        </div>
                    </div>
                    <div className="pending-item">
                        <FaRegClock className="employee_icons" />
                        <div className="pending-text">
                            <p className="totaltxt-small">{pendingOT}</p>
                            <p className="pending-label">Pending OT</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeDashboard;
