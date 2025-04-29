import AdminSidebar from '../components/Dashboard/AdminSidebar';
import { Outlet } from 'react-router-dom';

const AdminLayouts = () => {
  return (
    <div className="app-layout">
      <AdminSidebar>
        <Outlet />
      </AdminSidebar>
    </div>
  );
};

export default AdminLayouts;