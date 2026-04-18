import { useAuthStore } from "../store/authStore";

const SettingPage = () => {
  const { user, logout } = useAuthStore();

  return (
    <div className="settings-page">
      <h2 className="page-title">Account & Settings</h2>
      <div className="admin-profile">
        <h3 className="name">{user?.name}</h3>
        <p className="email">{user?.email}</p>
        <p className="role">Role: {user?.role}</p>
      </div>
      <div className="btn-actions">
        <button className="btn update-btn">Update Password</button>
        <button className="btn logout-btn" onClick={logout}>Logout</button>
      </div>
    </div>
  );
};

export default SettingPage;