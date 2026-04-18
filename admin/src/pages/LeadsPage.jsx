import { useEffect, useState } from "react";
import LeadCard from "../components/LeadCard";
import { useLeadStore } from "../store/leadStore";

const LeadsPage = () => {
  const {
    leads,
    fetchLeads,
    page,
    totalPages,
    isLoading,
    filter,
  } = useLeadStore();

  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchLeads(1, filter);
  }, [filter]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchLeads(1, filter, search);
  };

  const handlePageChange = (newPage) => {
    fetchLeads(newPage, filter, search);
  };

  return (
    <div className="leads-page">

      {/* HEADER */}
      <div className="leads-header">
        <h2 className="leads-title">Leads</h2>

        <form className="search-box" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search by name..."
            className="search-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="search-btn">Search</button>
        </form>
      </div>

      {/* FILTER */}
      <div className="filter-container">
        {["all", "available", "sold"].map((f) => (
          <button
            key={f}
            onClick={() => fetchLeads(1, f)}
            className={`filter-btn ${filter === f ? "active" : ""}`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* LEADS */}
      <div className="leads-container">
        {leads.map((lead) => (
          <LeadCard key={lead._id} lead={lead} />
        ))}
      </div>

      {/* PAGINATION */}
      <div className="pagination">
        <button
          className="page-btn"
          disabled={page === 1}
          onClick={() => handlePageChange(page - 1)}
        >
          Prev
        </button>

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            className={`page-btn ${page === i + 1 ? "active" : ""}`}
            onClick={() => handlePageChange(i + 1)}
          >
            {i + 1}
          </button>
        ))}

        <button
          className="page-btn"
          disabled={page === totalPages}
          onClick={() => handlePageChange(page + 1)}
        >
          Next
        </button>
      </div>

    </div>
  );
};

export default LeadsPage;