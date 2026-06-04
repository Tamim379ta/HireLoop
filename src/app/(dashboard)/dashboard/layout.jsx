import { DashboardSidebar } from "@/components/dashboard/Sidebar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex items-stretch">
      <DashboardSidebar />
      <div className="flex-1">{children}</div>
    </div>

  );
};

export default DashboardLayout;