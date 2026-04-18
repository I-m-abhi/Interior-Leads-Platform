import { useState, useEffect } from "react";
import { useLeadStore } from "../store/leadStore";

const CreateLead = () => {
  const [newLeadData, setNewLeadData] = useState({
    leadTitle: "",
    clientName: "",
    phone: "",
    size: "",
    budget: "",
    city: "",
    streetAddress: "",
    requirements: "",
    readyToMeet: "",
    timeToStart: "",
    meetingDetails: ""
  });
  const { createLead} = useLeadStore();

  const handleChange = (e) => {
    setNewLeadData({ ...newLeadData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = createLead(newLeadData);
    console.log("Create Lead Result:", result);
  }

  return (
    <div className="create-lead">
      <h2>Create Lead</h2>

      <form onSubmit={handleSubmit} className="lead-form">

        <input
          name="leadTitle"
          placeholder="Project Title"
          onChange={handleChange}
          required
        />
        <input
          name="clientName"
          placeholder="Client Name"
          onChange={handleChange}
          required
        />
        <input
          name="phone"
          placeholder="Phone"
          onChange={handleChange}
          required
        />
        <input
          name="size"
          placeholder="Project Size"
          onChange={handleChange}
          required
        />
        <input
          name="budget"
          placeholder="Budget"
          onChange={handleChange}
          required
        />
        <input
          name="city"
          placeholder="City"
          onChange={handleChange}
          required
        />
        <select
          name="requirements"
          onChange={handleChange}
        >
          <option value="">Select Requirement</option>
          <option value="Design">Design</option>
          <option value="Execution">Execution</option>
          <option value="Design & Execution">Design & Execution</option>
        </select>
        <select
          name="timeToStart"
          onChange={handleChange}
        >
          <option value="">Time to Start</option>
          <option value="Immediately">Immediately</option>
          <option value="Within 1 month">Within 1 month</option>
          <option value="Within 3 months">Within 3 months</option>
        </select>
        <input
          name="readyToMeet"
          placeholder="Ready to Meet?"
          onChange={handleChange}
        />
        <textarea
          name="meetingDetails"
          placeholder="Meeting Details"
          onChange={handleChange}
        />
        <input
          name="streetAddress"
          placeholder="Street Address"
          onChange={handleChange}
        />

        <button type="submit">Create Lead</button>
      </form>
    </div>
  )
};

export default CreateLead;