import * as React from "react"

import { VersionSwitcher } from "@/components/layout/version-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { Mail, Map, MapPin, PartyPopper, User, Utensils } from "lucide-react"


const data = {
  navMain: [
    {
      title: "Ações",
      url: "#",
      items: [
        {
          title: "Municipios",
          url: "/",
          icon: <MapPin className="mr-2 h-4 w-4" />,
        },
        {
          title: "Turismos & experiências",
          url: "/turismo-experiencia",
          icon: <Map className="mr-2 h-4 w-4" />,
        },
        {
          title: "Sabores & Culturas",
          url: "/sabores-culturas",
          icon: <Utensils className="mr-2 h-4 w-4" />,
        },
        {
          title: "Eventos",
          url: "/eventos",
          icon: <PartyPopper className="mr-2 h-4 w-4" />,
        },
        {
          title: "Newsletters",
          url: "/newsletters",
          icon: <Mail className="mr-2 h-4 w-4" />,
        },
        {
          title: "Usuários",
          url: "/usuarios",
          icon: <User className="mr-2 h-4 w-4" />,
        }
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <VersionSwitcher />
      </SidebarHeader>
      <SidebarContent>
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link href={item.url}>
                        {item.icon}
                        {item.title}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}