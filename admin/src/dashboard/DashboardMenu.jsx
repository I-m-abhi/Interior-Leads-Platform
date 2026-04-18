import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { House, ShoppingCart, Users, Settings, ChevronDown } from "lucide-react";

const DashboardMenu = () => {
  const [openLeads, setOpenLeads] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="dashboard-menu">

      <div>
        {/* HOME */}
        <div
          className={`menu-item ${isActive("/admin") ? "active" : ""}`}
          onClick={() => navigate("/admin")}
        >
          <House size={16} />
          <p className="item-title">Home</p>
        </div>

        {/* LEADS */}
        <div
          className="menu-item"
          onClick={() => setOpenLeads(!openLeads)}
        >
          <ShoppingCart size={16} />
          <p className="item-title">Leads</p>
          <ChevronDown size={14} style={{ marginLeft: "auto" }} />
        </div>

        {openLeads && (
          <div className="submenu">
            <div
              className={`submenu-item ${isActive("/admin/leads") ? "active" : ""}`}
              onClick={() => navigate("/admin/leads")}
            >
              All Leads
            </div>

            <div
              className={`submenu-item ${isActive("/admin/lead/create") ? "active" : ""}`}
              onClick={() => navigate("/admin/lead/create")}
            >
              Create Lead
            </div>
          </div>
        )}

        {/* USERS */}
        <div
          className={`menu-item ${isActive("/admin/users") ? "active" : ""}`}
          onClick={() => navigate("/admin/users")}
        >
          <Users size={16} />
          <p className="item-title">Users</p>
        </div>
      </div>

      <div className="menu-bottom">
        <div
          className={`menu-item ${isActive("/admin/settings") ? "active" : ""}`}
          onClick={() => navigate("/admin/settings")}
        >
          <Settings size={16} />
          <p className="item-title">Account & Settings</p>
        </div>
      </div>

    </div>
  );
};

export default DashboardMenu;