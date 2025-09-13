import * as React from "react"

import {
  Award,
  Bell,
  BookOpen,
  CircleDollarSign,
  Folder,
  HandCoins,
  History,
  Home,
  Key,
  LayoutTemplate,
  Settings2Icon,
  Ticket,
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
      title: "فرآینده‌های آماده",
      url: "/market-place",
      icon: LayoutTemplate
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
      icon: CircleDollarSign
    }
  ],
  projects: [
    {
      title: "تنظیمات",
      url: "#",
      icon: Settings2Icon
    },
    {
      title: "پلن‌های پیشرفته",
      url: "#",
      icon: Award
    },
    {
      title: "مستندات",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
  ],
}

export function AppSidebar({
  ...props
}) {
  return (
    <Sidebar side="right" className="bg-slate-50 px-4" variant="inset" {...props}>
      <SidebarHeader className="bg-slate-50  mt-1.5">
        <SidebarMenu className="rounded-l-2xl">
          <SidebarMenuItem>
              <Logo size="text-xl" />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="bg-slate-50">
        <NavMain title={`فضای کاری من`} items={data.navMain} />
        <NavMain title={`مالی`} items={data.invoices} />
        <NavMain title={`حساب کاربری`} items={data.projects} />
      </SidebarContent>
      <SidebarFooter className="mb-4 text-black  rounded-l-2xl">
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
