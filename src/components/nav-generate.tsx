"use client"

import { IconPhoto } from "@tabler/icons-react"

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"

export function NavGenerate() {
  const generateItems = [
    {
      title: "Image",
      url: "/dashboard/image-generation",
      icon: IconPhoto,
    },
  ]

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Generate</SidebarGroupLabel>
      <SidebarMenu>
        {generateItems.map((item) => (
          <SidebarMenuItem key={item.title}>
            <Link href={item.url} className="w-full">
              <SidebarMenuButton>
                {item.icon && <item.icon />}
                <span>{item.title}</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
