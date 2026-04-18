import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./index.css"
import "../src/styles/style.css"
import App from './App.jsx'
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <Toaster
      position="top-right"
      // toastOptions={{
      //   style: {
      //     background: "#111827",
      //     color: "#fff",
      //     borderRadius: "10px",
      //     padding: "12px",
      //     fontSize: "14px",
      //   },
      // }}
      reverseOrder={false}
    />
  </StrictMode>,
)