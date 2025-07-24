"use client"

import React, { useEffect } from "react"
import { Check, ChevronsUpDown, GalleryVerticalEnd, LucideIcon, Trash } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar"
import { useAuth } from "@/contexts/AuthContexts"


export function VersionSwitcher() {
  const { logout } = useAuth();
  const { user } = useAuth();
  
  const buttons = [
    {
      label: "Sair",
      icon: <Trash className="mr-2 h-4 w-4" />,
      onClick: () => {
        logout();
      },
    },
  ]
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-full">
                <Avatar>
                  <AvatarFallback className="text-white">
                    {user?.nome?.charAt(0).toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="flex flex-col gap-0.5 leading-none">
                <span className="font-medium">
                  {user?.nome}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width)"
            align="start"
          >
            {buttons.map((button, index) => (
              <DropdownMenuItem key={index} onClick={button.onClick}>
                <div className="flex items-center gap-2">
                  {button.icon}
                  <span>{button.label}</span>
                </div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu >
  )
}
