import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const navigate = useNavigate();
  const { isLoading, login } = useAuthStore();

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await login(formData);

    if (res?.success) {
      navigate("/admin");
    }

    // if (response.success) {
    //   const user = useAuthStore.getState().user;

    //   if (user.role === "admin") {
    //     navigate("/admin");
    //   } else {
    //     alert(`Access denied for role: ${user.role}`);
    //   }
    // } else {
    //   alert(response.error);
    // }
  };

  return (
    <div className="login-page">
      <div className="container">

        <h2 className="login-title">
          Kindly login to access admin dashboard
        </h2>

        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="email"
            placeholder="Enter your email"
            className="login-input"
            required
            name="email"
            value={formData.email}
            onChange={handleChange}
          />

          <input
            type="password"
            placeholder="Enter your password"
            className="login-input"
            required
            name="password"
            value={formData.password}
            onChange={handleChange}
          />

          <button type="submit" className="login-btn">
            {isLoading ? "Logging in ..." : "Login"}
          </button>
        </form>

      </div>
    </div>
  );
};

export default Login;