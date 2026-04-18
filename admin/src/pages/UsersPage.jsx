import { useEffect } from "react";
import { useUserStore } from "../store/usersStore";
import UserCard from "../components/UserCard";

const UsersPage = () => {
  const { users, fetchUsers, isLoading } = useUserStore();

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="users-page">
      <h2 className="page-title">Users (Designers)</h2>

      {isLoading ? (
        <p>Loading users...</p>
      ) : (
        <div className="users-grid">
          {users.map((user) => (
            <UserCard key={user._id} user={user} />
          ))}
        </div>
      )}
    </div>
  );
};

export default UsersPage;