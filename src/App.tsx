import { createBrowserRouter, RouterProvider, Navigate } from "react-router";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/DashBoard";
import { isAuthenticated } from "./utils/authUtils";

// Simple wrapper component for protected routes
// function ProtectedRoute({ children }: { children: React.ReactNode }) {
//   if (!isAuthenticated()) {
//     return <Navigate to="/login" replace />;
//   }
//   return <>{children}</>;
// }
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

// Simple wrapper component for login route (redirect if already authenticated)
function PublicRoute({ children }: { children: React.ReactNode }) {
  if (isAuthenticated()) {
    return <Navigate to="/dashboard" replace />;
  }
  return <>{children}</>;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Navigate to={isAuthenticated() ? "/dashboard" : "/login"} replace />
    ),
  },
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
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
