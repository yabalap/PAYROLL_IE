import React, { useState } from "react";
import "./SidebarAdmin.css";

import { FaBars } from "react-icons/fa";
import { LuLayoutDashboard } from "react-icons/lu";
import { FaUsers } from "react-icons/fa";
import { IoChevronBackCircleOutline, IoCashOutline, IoLogOutOutline } from "react-icons/io5";
import { FaRegBuilding } from "react-icons/fa";

import { NavLink } from "react-router-dom";
import IE_logo from "../../assets/LOGO_MINI.svg";



const AdminSidebar = ({ children }) => {

    const [isOpen, setIsOpen] = useState(true);

    const menulist = [
        {   
            path: "/admin-dashboard",
            name: "Dashboard",
            icon: <LuLayoutDashboard />
        },
        {
            path: "/admin-dashboard/employeeadmin",
            name: "Employee",
            icon: <FaUsers />
        },
        {
            path: "/admin-dashboard/departmentadmin",
            name: "Department",
            icon: <FaRegBuilding />
        },
        {
            path: "/leaveot",
            name: "Leave/OT",
            icon: <IoChevronBackCircleOutline />
        },
        {
            path: "/payroll",
            name: "Payroll",
            icon: <IoCashOutline />
        }
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
                    <NavLink
                        to="/login"
                        className="link logout"
                        activeClassName="active"
                    >
                        <div className="icon"><IoLogOutOutline /></div>
                        <div className="link_text" style={{ display: isOpen ? "block" : "none" }}>
                            Logout
                        </div>
                    </NavLink>
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

export default AdminSidebar