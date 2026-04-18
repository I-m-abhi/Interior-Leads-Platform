import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EditLeadForm from "../dashboard/EditLeadForm";

const API = "http://localhost:7000";

const LeadDetailsPage = () => {
  const { id } = useParams();
  const [lead, setLead] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchLead();
  }, []);

  const fetchLead = async () => {
    const res = await fetch(`${API}/api/lead/${id}`, {
      credentials: "include",
    });
    const data = await res.json();
    setLead(data.lead);
  };

  if (!lead) return <p>Loading...</p>;

  return (
    <div className="lead-details">
      {!isEditing ? (
        <>
          <h2>{lead.leadTitle}</h2>

          <div className="details-grid">
            <p><strong>Client:</strong> {lead.clientDetails.name}</p>
            <p><strong>Phone:</strong> {lead.clientDetails.phone}</p>
            <p><strong>City:</strong> {lead.city}</p>
            <p><strong>Budget:</strong> {lead.budget}</p>
            <p><strong>Size:</strong> {lead.size}</p>
            <p><strong>Status:</strong> {lead.status}</p>
          </div>

          <button onClick={() => setIsEditing(true)}>
            Edit Lead
          </button>
        </>
      ) : (
        <EditLeadForm lead={lead} setIsEditing={setIsEditing} refresh={fetchLead} />
      )}
    </div>
  );
};

export default LeadDetailsPage;