import { createBrowserRouter, RouterProvider, Navigate } from "react-router";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/DashBoard";
import { isAuthenticated } from "./utils/authUtils";
import { Suspense } from "react";

// Simple wrapper component for protected routes
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const authenticated = isAuthenticated();

  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
}

// Simple wrapper component for login route (redirect if already authenticated)
function PublicRoute({ children }: { children: React.ReactNode }) {
  const authenticated = isAuthenticated();

  if (authenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  return <>{children}</>;
}

const router = createBrowserRouter([
  {
    path: "/login",
    element: (
      <PublicRoute>
        <LoginPage />
      </PublicRoute>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "*",
    element: <Navigate to="/login" replace />,
  },
]);

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}
function Loading() {
  return <h2>🌀 Loading...</h2>;
}

export default App;
