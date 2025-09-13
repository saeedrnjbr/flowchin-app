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
          <header className="flex h-16 shrink-0 items-center gap-2  px-6">
            <SidebarTrigger className="-ml-1" />
          </header>
          <div className="px-8">
            {children}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </AclMiddleware>
  )
}
