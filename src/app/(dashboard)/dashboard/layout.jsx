import { DashboardSidebar } from "@/components/dashboard/Sidebar";

const DashboardLayout = ({ children }) => {
  return (
    <div>
      <div className="flex min-h-screen">
        <DashboardSidebar />
        <div className="flex-1">{children}</div>
      </div>

    </div>
  );
};

export default DashboardLayout;