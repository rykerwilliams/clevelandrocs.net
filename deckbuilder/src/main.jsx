import React from "react";
import ReactDOM from "react-dom/client";
import App from "@/App.jsx";
import "@/index.css";

function initializeTheme() {
  const storedTheme = localStorage.getItem("theme");
  const theme = storedTheme === "light" || storedTheme === "dark" ? storedTheme : "dark";

  if (!storedTheme) {
    localStorage.setItem("theme", theme);
  }

  document.documentElement.setAttribute("data-theme", theme);
  document.documentElement.setAttribute("data-theme-setting", theme);
}

// Support direct links like /build by translating them to hash routes.
if (!window.location.hash) {
  const cleanPath = window.location.pathname.replace(/\/+$/, "");
  if (cleanPath === "/build" || cleanPath.endsWith("/build")) {
    const basePrefix = cleanPath.slice(0, -"/build".length) || "";
    const query = window.location.search || "";
    window.location.replace(`${basePrefix}/#/build${query}`);
  }
}

initializeTheme();

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
