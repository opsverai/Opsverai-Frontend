import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { RootErrorBoundary } from "./RootErrorBoundary.tsx";
import "./index.css";

const rootEl = document.getElementById("root");
if (rootEl) {
  createRoot(rootEl).render(
    <RootErrorBoundary>
      <App />
    </RootErrorBoundary>,
  );
} else {
  document.body.innerHTML =
    '<p style="margin:1.5rem;font-family:system-ui,sans-serif">Missing #root. Check index.html.</p>';
}
