import { ShieldAlert, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="unauth-page">
      <div className="unauth-card">
        <div className="icon-box">
          <ShieldAlert size={48} />
        </div>

        <h1 className="unauth-title">Access Denied</h1>

        <p className="unauth-desc">
          You don’t have permission to access this page.  
          Please contact admin or go back to dashboard.
        </p>

        <div className="unauth-actions">
          <button
            className="btn back-btn"
            onClick={() => navigate("/admin")}
          >
            <ArrowLeft size={16} />
            Go to Dashboard
          </button>

          <button
            className="btn logout-btn"
            onClick={() => navigate("/")}
          >
            Login Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;