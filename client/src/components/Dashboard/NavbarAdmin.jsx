import React from "react";
import { NavLink } from "react-router-dom";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoPersonCircleSharp } from "react-icons/io5";
import { useAuth } from "../../context/AuthContext";
import './Navbar.css';

const NavbarAdmin = () => { 

    const { user } = useAuth()
  return (
    <nav className="navbarAdmin">
      <div className="navbarMenu">

        <NavLink 
          to={`/employee-dashboard/profile/${user._id}`} 
          className="linkss" 
          end>
          <div className="iconss">
          <IoPersonCircleSharp />
          </div>
        </NavLink>

        <NavLink to="/home" className="linkss" end>
          <div className="iconss">
          <IoMdNotificationsOutline />  {/* New icon */}
          </div>
        </NavLink>

      </div>
    </nav>
  );
};

export default NavbarAdmin;
