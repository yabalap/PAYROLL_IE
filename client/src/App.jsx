import { BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import React from "react";

import Login from '../src/pages/Login';
import AdminDashboard from "./pages/AdminDashboard"; // assuming 'pages' is in the same directory
import EmployeeDashboard from './pages/EmployeeDashboard';
import PrivateRoutes from './utils/PrivateRoutes';
import RoleBaseRoutes from './utils/RoleBaseRoutes';
 


function App() {

  return (
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<Navigate to= '/login' />} ></Route>
          <Route path='/login' element={<Login/>} ></Route>

          <Route path='/admin-dashboard' element={

            <PrivateRoutes>
              <RoleBaseRoutes requiredRole={["admin"]}>

              <AdminDashboard/>

              </RoleBaseRoutes>
            </PrivateRoutes>
            
            
            
            } ></Route>
          <Route path='/employee-dashboard' element={<EmployeeDashboard/>} ></Route>
      </Routes>
    
    </BrowserRouter>
 
  )
}

export default App
