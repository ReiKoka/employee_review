import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
} from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import AppLayout from "./pages/AppLayout";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import SingleUser from "./pages/SingleUser";
import DepartmentsPage from "./pages/DepartmentsPage";
import GoalsPage from "./pages/GoalsPage";
import SingleGoal from "./pages/SingleGoal";
import Loader from "./components/Loader";
import Reviews from "./pages/Reviews";
import ErrorPage from "./pages/ErrorPage";
import ErrorPageInApp from "./pages/ErrorPageInApp";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
        errorElement: <ErrorPageInApp />,
      },
      {
        path: "/home",
        element: (
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        ),
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <Dashboard />,
          },
          {
            path: "users",
            element: <Users />,
          },
          {
            path: "users/:id",
            element: <SingleUser />,
          },
          {
            path: "departments",
            element: <DepartmentsPage />,
          },
          {
            path: "goals",
            element: <GoalsPage />,
          },
          {
            path: "goals/:id",
            element: <SingleGoal />,
          },
          {
            path: "reviews",
            element: <Reviews />,
          },
          {
            path: "*", 
            element: <ErrorPageInApp />, 
          },
        ],
      },
    ],
  },
]);

const App = () => {
  const { loading } = useAuth();

  if (loading) {
    return <Loader />;
  }

  return <RouterProvider router={router} />;
};

export default App;
