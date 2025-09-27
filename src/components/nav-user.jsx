"use client"

import {
  ChevronsUpDown,
  FileKey,
  Headset,
  Home,
  LogOut,
  ShieldX,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { useSelector } from "react-redux"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Link from "next/link"

export function NavUser() {

  const [user, setUser] = useState()
  const router = useRouter()
  const users = useSelector(state => state.users)
  const { isMobile } = useSidebar()

  useEffect(() => {
    if (users.currentData) {
      setUser(users.currentData)
    }
  }, [users])


  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu >
          <DropdownMenuTrigger asChild>
            {user && <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent cursor-pointer data-[state=open]:text-sidebar-accent-foreground sidebar-bg">
              <Avatar>
                <AvatarFallback className="rounded-lg  text-white text-lg bg-indigo-500">{user.user_identifier.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate text-indigo-400">{user.user_identifier}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>}
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) rtl min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}>
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Link className="flex gap-x-2" href="/">
                  <Home />
                  <span>صفحه‌اصلی</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Link className="flex gap-x-2" href="/page/term">
                  <ShieldX />
                  <span>شرایط و قوانین</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                 <Link className="flex gap-x-2" href="/page/privacy">
                  <FileKey />
                  <span>حریم خصوصی</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link className="flex gap-x-2" href="/page/support">
                  <Headset />
                  <span>پشتیبانی</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer" onClick={() => {
              localStorage.removeItem("_token_");
              router.push("/account")
            }}>
              <LogOut />
              خروج
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
