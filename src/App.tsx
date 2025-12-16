import { createBrowserRouter, RouterProvider, Navigate } from "react-router";
import { isAuthenticated } from "./utils/authUtils";
import { Suspense, lazy } from "react";

// Lazy load pages for code splitting and Suspense support
const LoginPage = lazy(() => import("./pages/LoginPage"));
const Dashboard = lazy(() => import("./pages/DashBoard"));

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
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-700">Loading...</h2>
      </div>
    </div>
  );
}

export default App;
