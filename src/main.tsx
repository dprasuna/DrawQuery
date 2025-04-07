import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import LandingPage from "./routes/LandingPage.tsx";
import GuidePage from "./routes/GuidePage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/app",
    element: <App />,
  },
  {
    path : "/guide",
    element : <GuidePage />
  }
]);

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Failed to find root element");
}

createRoot(rootElement).render(
  <RouterProvider router={router} />
);
