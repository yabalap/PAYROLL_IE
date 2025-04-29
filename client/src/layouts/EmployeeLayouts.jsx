import EmployeeSidebar from '../components/EmployeeDashboard/EmployeeSidebar';
import { Outlet } from 'react-router-dom';

const EmployeeLayouts = () => {
  return (
    <div className="app-layout">
      <EmployeeSidebar>
        <Outlet />
      </EmployeeSidebar>
    </div>
  );
};

export default EmployeeLayouts;