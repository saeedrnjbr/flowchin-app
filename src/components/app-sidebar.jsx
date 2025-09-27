import * as React from "react"

import {
  Award,
  Bell,
  BookOpen,
  ChartGantt,
  CircleDollarSign,
  Cog,
  FileText,
  Folder,
  HandCoins,
  History,
  Home,
  Key,
  LayoutTemplate,
  Settings2Icon,
  Store,
  Ticket,
  Wallet2,
  Workflow,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"
import Logo from "@/cs-components/logo"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "داشبورد",
      url: "/dashboard",
      icon: Home,
      isActive: true
    },
    {
      title: "پوشه‌ها",
      url: "/workspaces",
      icon: Folder,
      isActive: true
    },
    {
      title: "فرآیندها",
      url: "/flows",
      icon: Workflow,
      isActive: true
    },
    {
      title: "تاریخچه اجرا‌ها",
      url: "#",
      icon: History
    },
    {
      title: "کلید‌ها و دسترسی",
      url: "#",
      icon: Key,
      isActive: true
    },
    {
      title: "بازارچه فرآیند‌ها",
      url: "/marketplace",
      icon: Store
    },

  ],
  navSecondary: [
    {
      title: "تیکت و پشتیبانی",
      url: "#",
      icon: Ticket,
    },
    {
      title: "اعلان‌ها",
      url: "#",
      icon: Bell,
    },
  ],
  invoices: [
    {
      title: "پرداخت‌ها",
      url: "#",
      icon: HandCoins
    },
    {
      title: "درآمدها",
      url: "#",
      icon: Wallet2
    }
  ],
  projects: [
    {
      title: "تنظیمات",
      url: "#",
      icon: Cog
    },
    {
      title: "پلن‌های پیشرفته",
      url: "#",
      icon: ChartGantt
    },
    {
      title: "مستندات",
      url: "#",
      icon: FileText
    },
  ],
}

export function AppSidebar({
  ...props
}) {
  return (
    <Sidebar side="right" className="sidebar-bg" variant="inset" {...props}>
      <SidebarHeader className="sidebar-bg pb-5">
        <SidebarMenu className="rounded-l-2xl">
          <SidebarMenuItem>
            <Link href="/" className="flex justify-center items-center gap-2 text-center">
              <img className={`w-32 object-contain`} src="/images/logo-white.png" />
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="sidebar-bg">
        <NavMain title={`فضای کاری من`} items={data.navMain} />
        <NavMain title={`مالی`} items={data.invoices} />
        <NavMain title={`حساب کاربری`} items={data.projects} />
      </SidebarContent>
      <SidebarFooter className="sidebar-bg text-white">
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
