import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"


import AclMiddleware from "@/cs-components/acl-middlware"

export default function DashboardLayout({ children, title, description = "" }) {
  return (
    <AclMiddleware>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
           <SidebarTrigger className="-ml-1 mx-3 mt-2" />
          <div className="px-6">
            {children}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </AclMiddleware>
  )
}
