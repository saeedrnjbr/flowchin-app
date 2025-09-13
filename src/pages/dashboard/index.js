import { Stats8 } from "@/components/stats8"
import DashboardLayout from "@/cs-components/dashboard-layout"

export default function Dashboard() {
  return <DashboardLayout>
    <div className="mb-5">
      <span className="text-2xl font-bold">داشبورد</span>
    </div>
    <Stats8 />
  </DashboardLayout>
}
