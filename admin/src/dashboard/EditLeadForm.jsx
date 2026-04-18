import { useState } from "react";

const API = "http://localhost:7000";

const EditLeadForm = ({ lead, setIsEditing, refresh }) => {

  const [formData, setFormData] = useState({
    leadTitle: lead.leadTitle,
    clientName: lead.clientDetails.name,
    phone: lead.clientDetails.phone,
    size: lead.size,
    budget: lead.budget,
    city: lead.city,
    streetAddress: lead.description?.streetAddress || "",
    requirements: lead.description?.requirements || "",
    readyToMeet: lead.description?.readyToMeet || "",
    timeToStart: lead.description?.timeToStart || "",
    meetingDetails: lead.description?.meetingDetails || "",
  });

  const [isChanged, setIsChanged] = useState(false);

  const handleChange = (e) => {
    const updated = { ...formData, [e.target.name]: e.target.value };
    setFormData(updated);

    // 🔥 check changes
    setIsChanged(JSON.stringify(updated) !== JSON.stringify({
      leadTitle: lead.leadTitle,
      clientName: lead.clientDetails.name,
      phone: lead.clientDetails.phone,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const res = await fetch(`${API}/api/admin/lead/${lead._id}`, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        leadTitle: formData.leadTitle,
        clientDetails: {
          name: formData.clientName,
          phone: formData.phone,
        },
        size: formData.size,
        budget: formData.budget,
        city: formData.city,
        description: {
          requirements: formData.requirements,
          readyToMeet: formData.readyToMeet,
          timeToStart: formData.timeToStart,
          meetingDetails: formData.meetingDetails,
          streetAddress: formData.streetAddress,
        },
      }),
    });

    if (res.ok) {
      refresh();
      setIsEditing(false);
    }
  };

  return (
    <form className="lead-form" onSubmit={handleUpdate}>
      <input name="leadTitle" value={formData.leadTitle} onChange={handleChange} />
      <input name="clientName" value={formData.clientName} onChange={handleChange} />
      <input name="phone" value={formData.phone} onChange={handleChange} />
      <input name="size" value={formData.size} onChange={handleChange} />
      <input name="budget" value={formData.budget} onChange={handleChange} />
      <input name="city" value={formData.city} onChange={handleChange} />

      <button disabled={!isChanged}>
        Update Lead
      </button>

      <button type="button" onClick={() => setIsEditing(false)}>
        Cancel
      </button>
    </form>
  );
};

export default EditLeadForm;