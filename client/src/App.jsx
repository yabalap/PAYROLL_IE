import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import React from "react";

import Login from '../src/pages/Login';
import AdminDashboard from "./pages/Admin/AdminDashboard";
import EmployeeDashboard from './pages/Employee/EmployeeDashboard';
import PrivateRoutes from './utils/PrivateRoutes';
import RoleBaseRoutes from './utils/RoleBaseRoutes';
import Navbar from './components/Dashboard/NavbarAdmin';
//Admin Routes

import DashboardAdmin from '../src/components/Dashboard/DashboardAdmin';
import DepartmentAdmin from "../src/components/Department/DepartmentAdmin";
import AdminSidebar from '../src/components/Dashboard/AdminSidebar';
import AddDepartment from './components/Department/AddDepartment';
import UpdateDepartment from './components/Department/UpdateDepartment';
import EmployeeAdmin from './components/Employee/EmployeeAdmin';
import AddEmployee from './components/Employee/AddEmployee';
import ViewEmployee from './components/Employee/ViewEmployee';
import UpdateEmployee from './components/Employee/UpdateEmployee';

//Employee Routes
import DashboardEmployee from '../src/components/EmployeeDashboard/DashboardEmployee';
import EmployeeSidebar from './components/EmployeeDashboard/EmployeeSidebar';
import EmployeeLeave from './components/EmployeeLeave/LeaveEmployee';
import AddLeave from './components/EmployeeLeave/AddLeave';

function App() {
  return (
    <BrowserRouter>
      <Routes>

         ////////////// Admin Routes //////////////

        <Route path='/' element={<Navigate to='/login' />} />
        <Route path='/login' element={<Login />} />
        <Route path='/admin-dashboard' element={
          <PrivateRoutes>
            <AdminSidebar>
              <Navbar/> 
              <RoleBaseRoutes requiredRole={["admin"]}>
                  <AdminDashboard />
                </RoleBaseRoutes>
            </AdminSidebar>
          </PrivateRoutes>

        }>
          <Route index element={<DashboardAdmin />} />
          <Route path='departmentadmin' element={<DepartmentAdmin />} />
          <Route path='add-department' element={<AddDepartment />} />
          <Route path='department/:id' element={<UpdateDepartment />} />
          
          <Route path='employeeadmin' element={<EmployeeAdmin />} />
          <Route path='add-employee' element={<AddEmployee />} />
          <Route path='employeeadmin/:id' element={<ViewEmployee />} />
          <Route path='employeeadmin/update/:id' element={<UpdateEmployee />} /> {/* Fixed this path */}
        </Route>


        ////////////// Employee Routes //////////////

        <Route path='/employee-dashboard' element={
          <PrivateRoutes>
            <EmployeeSidebar>
            <Navbar/> 
                <RoleBaseRoutes requiredRole={["employee"]}>
                    <EmployeeDashboard />
                  </RoleBaseRoutes>
              </EmployeeSidebar>
          </PrivateRoutes>
        }>

        <Route index element={<DashboardEmployee />} />

        <Route path='profile/:id' element={<ViewEmployee />} />
        <Route path='leave' element={<EmployeeLeave />} />
        <Route path='add-leave' element={<AddLeave />} />

        </Route>


      </Routes>
    </BrowserRouter>
  );
}

export default App;