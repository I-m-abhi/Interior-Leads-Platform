import toast from "react-hot-toast";

// ✅ SUCCESS TOAST
export const showSuccess = (message) => {
  toast.success(message, {
    style: {
      background: "#1e293b",
      color: "#fff",
      border: "1px solid #22c55e",
      padding: "12px 16px",
      fontSize: "14px",
      borderRadius: "8px",
    },
    iconTheme: {
      primary: "#22c55e",
      secondary: "#fff",
    },
  });
};

// ❌ ERROR TOAST
export const showError = (message) => {
  toast.error(message, {
    style: {
      background: "#1e293b",
      color: "#fff",
      border: "1px solid #ef4444",
      padding: "12px 16px",
      fontSize: "14px",
      borderRadius: "8px",
    },
    iconTheme: {
      primary: "#ef4444",
      secondary: "#fff",
    },
  });
};