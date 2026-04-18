import { useUserStore } from "../store/usersStore";

const UserCard = ({ user }) => {
  const { deleteUser, changeRole } = useUserStore();

  return (
    <div className="user-card-advanced">

      <div className="user-card-header">
        <p className="user-id">ID: {user._id}</p>
        <span className={`role-badge ${user.role}`}>
          {user.role}
        </span>
      </div>

      <div className="user-main-info">
        <h3>{user.name}</h3>
        <p>{user.email}</p>
      </div>

      <div className="user-meta">
        <div><strong>Leads:</strong> {user.leadsCount || 0}</div>
        <div><strong>Joined:</strong> {new Date(user.createdAt).toLocaleDateString()}</div>
      </div>

      <div className="user-status">
        <span className={user.isVerified ? "verified" : "not-verified"}>
          {user.isVerified ? "Verified" : "Not Verified"}
        </span>
      </div>

      {/* COMPANY */}
      <div className="company-card">
        <h4>Company</h4>
        <p>{user.companyDetails?.companyName}</p>
        <p>{user.companyDetails?.city}</p>
      </div>

      {/* ACTIONS */}
      <div className="user-actions">
        <button
          className="btn-delete"
          onClick={() => deleteUser(user._id)}
        >
          Delete
        </button>

        <button
          className="btn-role"
          onClick={() =>
            changeRole(user._id, user.role === "admin" ? "user" : "admin")
          }
        >
          Make {user.role === "admin" ? "User" : "Admin"}
        </button>
      </div>

    </div>
  );
};

export default UserCard;