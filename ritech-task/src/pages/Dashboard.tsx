import AdminDashboard from "@/components/AdminDashboard";
import EmployeeDashboard from "@/components/EmployeeDashboard";

import { useAuth } from "@/context/AuthContext";
import ManagerDashboard from "@/components/ManagerDashboard";

function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="h-full text-foreground">
      {user?.role === "admin" && <AdminDashboard />}
      {user?.role === "manager" && <ManagerDashboard />}
      {user?.role === "employee" && <EmployeeDashboard />}
    </div>
  );
}

export default Dashboard;
