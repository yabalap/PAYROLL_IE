import { BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import React from "react";

import Login from '../src/pages/Login';
import AdminDashboard from "./pages/AdminDashboard"; // assuming 'pages' is in the same directory


function App() {

  return (
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<Navigate to= '/admin-dashboard' />} ></Route>
          <Route path='/login' element={<Login/>} ></Route>
          <Route path='/admin-dashboard' element={<AdminDashboard/>} ></Route>
      </Routes>
    
    </BrowserRouter>
 
  )
}

export default App
