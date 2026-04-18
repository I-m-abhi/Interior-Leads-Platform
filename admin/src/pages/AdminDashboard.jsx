import Header from "../components/Header";
import DashboardMenu from "../dashboard/DashboardMenu";
import { Outlet } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <Header />

      <div className="dashboard" style={{ display: "flex" }}>
        <DashboardMenu />

        <div className="dashboard-content">
          <Outlet /> {/* 🔥 renders pages */}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;