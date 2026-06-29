import React from "react";
import ReactDOM from "react-dom/client";
import App from "@/App.jsx";
import "@/index.css";

// Support direct links like /build by translating them to hash routes.
if (!window.location.hash) {
  const cleanPath = window.location.pathname.replace(/\/+$/, "");
  if (cleanPath === "/build" || cleanPath.endsWith("/build")) {
    const basePrefix = cleanPath.slice(0, -"/build".length) || "";
    const query = window.location.search || "";
    window.location.replace(`${basePrefix}/#/build${query}`);
  }
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
