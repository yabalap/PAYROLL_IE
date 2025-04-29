import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";
import { LuLayoutDashboard } from "react-icons/lu";
import { GiAirplaneDeparture } from "react-icons/gi";
import { GiMoneyStack } from "react-icons/gi";
import { IoTimerOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import IE_logo from "../../assets/LOGO_MINI.svg";

import { useAuth } from '../../context/AuthContext'

const EmployeeSidebar = ({ children }) => {
    const [isOpen, setIsOpen] = useState(true);
    const { logout } = useAuth();

    const menulist = [
        {
            path: "/employee-dashboard",
            name: "Dashboard",
            icon: <LuLayoutDashboard />
        },
        {
            path: "/employee-dashboard/leave",
            name: "Leave Requests",
            icon: <GiAirplaneDeparture />
        },
        {
            path: "/employee-dashboard/ot",
            name: "OT Requests",
            icon: <IoTimerOutline />
        },
        {
            path: "/employee-dashboard/payslip",
            name: "Payslips",
            icon: <GiMoneyStack />
        },

    ];

    return (
        <div className="container">
            <div style={{ width: isOpen ? "15.2rem" : "4rem" }} className="sidebar">
                <div className="top_section">
                    <img
                        src={IE_logo}
                        className='logo'
                        style={{
                            display: isOpen ? "block" : "none",
                            width: "4rem",
                            height: "4rem",
                            paddingLeft: "2rem"
                        }}
                    />
                    <div
                        style={{ marginLeft: isOpen ? "3rem" : "0rem" }}
                        onClick={() => setIsOpen(!isOpen)}
                        className="bar"
                    >
                        <FaBars />
                    </div>
                </div>

                <div className="menu_items">
                    {menulist.map((el, i) => (
                        <NavLink
                            to={el.path}
                            key={i}
                            className={({ isActive }) => isActive ? "link active" : "link"}
                            end
                        >
                            <div className="icon">{el.icon}</div>
                            <div className="link_text" style={{ display: isOpen ? "block" : "none" }}>
                                {el.name}
                            </div>
                        </NavLink>
                    ))}
                </div>

                {/* Logout at bottom */}
                <div className="logout_section">
                    <button
                        className="link logout"
                        onClick={logout}
                    >
                        <div className="icon"><IoLogOutOutline /></div>
                        <div className="link_text" style={{ display: isOpen ? "block" : "none" }}>
                            Logout
                        </div>
                    </button>
                </div>
            </div>

            <main
                style={{
                    marginLeft: isOpen ? "15.2rem" : "4rem",
                    width: `calc(100% - ${isOpen ? "15.2rem" : "4rem"})`,
                    transition: "margin-left 0.3s ease, width 0.3s ease",
                }}
            >
                {children}
            </main>
        </div>
    );
};

export default EmployeeSidebar;
