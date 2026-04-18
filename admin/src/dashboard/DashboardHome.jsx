const DashboardHome = () => {
  return (
    <div className="dashboard-home">
      <h2>Dashboard Overview</h2>

      <div className="stats-grid">
        <div className="stat-card">Total Leads: 120</div>
        <div className="stat-card">Unsold Leads: 45</div>
        <div className="stat-card">Total Users: 30</div>
        <div className="stat-card">Active Deals: 10</div>
      </div>
    </div>
  );
};

export default DashboardHome;