import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import React from "react";

import Login from '../src/pages/Login';
import AdminDashboard from "./pages/Admin/AdminDashboard";
import EmployeeDashboard from './pages/Employee/EmployeeDashboard';
import PrivateRoutes from './utils/PrivateRoutes';
import RoleBaseRoutes from './utils/RoleBaseRoutes';

import DashboardAdmin from '../src/components/Dashboard/DashboardAdmin';
import DepartmentAdmin from "../src/components/Department/DepartmentAdmin";
import Sidebar from '../src/components/Dashboard/AdminSidebar';
import AddDepartment from './components/Department/AddDepartment';
import UpdateDepartment from './components/Department/UpdateDepartment';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to='/login' />} />
        <Route path='/login' element={<Login />} />

        <Route path='/admin-dashboard' element={
          <Sidebar>
            <PrivateRoutes>
              <RoleBaseRoutes requiredRole={["admin"]}>
                <AdminDashboard />
              </RoleBaseRoutes>
            </PrivateRoutes>
          </Sidebar>
        }>
          <Route index element={<DashboardAdmin />} />
          <Route path='departmentadmin' element={<DepartmentAdmin />} />
          <Route path='add-department' element={<AddDepartment />} />
          <Route path='department/:id' element={<UpdateDepartment />} />


        </Route>

        <Route path='/employee-dashboard' element={<EmployeeDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
