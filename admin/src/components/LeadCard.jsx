import { Pencil, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLeadStore } from "../store/leadStore";

const LeadCard = ({ lead }) => {
    const navigate = useNavigate();
  const { deleteLead } = useLeadStore();

  return (
    <div 
    className="lead-card"
    onClick={() => navigate(`/admin/lead/${lead._id}`)}
    >
      <div className="lead-title">{lead.leadTitle}</div>

      <div className="lead-client">
        {lead.clientDetails.name}
      </div>

      <div className="lead-info">
        <p>Budget: {lead.budget}</p>
        <p>City: {lead.city}</p>
      </div>

      <span className={`lead-status status-${lead.status}`}>
        {lead.status}
      </span>

      <div className="lead-actions">
        <div className="action-btn">
          <Pencil size={16} />
        </div>

        <div className="action-btn" onClick={() => deleteLead(lead._id)}>
          <Trash size={16} />
        </div>
      </div>
    </div>
  );
};

export default LeadCard;