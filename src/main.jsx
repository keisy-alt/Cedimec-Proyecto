import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { TurnosProvider } from "./context/TurnosContext.jsx";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <TurnosProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </TurnosProvider>
  </StrictMode>
);
