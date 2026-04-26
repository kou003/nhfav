import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";

const router = createHashRouter([{ path: "*", element: <App /> }]);

// biome-ignore lint/style/noNonNullAssertion: tmp
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
