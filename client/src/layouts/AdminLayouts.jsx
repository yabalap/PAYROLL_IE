import Sidebar from '../components/Dashboard/AdminSidebar';
import { Outlet } from 'react-router-dom';

const AdminLayouts = () => {
  return (
    <div className="app-layout">
      <Sidebar>
        <Outlet />
      </Sidebar>
    </div>
  );
};

export default AdminLayouts;