import { useAuthStore } from "../store/authStore";

const Header = () => {
  const { user } = useAuthStore();

  return (
    <header className="container">
      <div className="title">Leads Platform</div>
      <div className="user-name">{user?.name}</div>
    </header>
  )
};

export default Header;