"use client"

import { IconPhoto } from "@tabler/icons-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function NavGenerate() {
  const pathname = usePathname()
  const generateItems = [
    {
      title: "Image",
      url: "/dashboard/image-generation",
      icon: IconPhoto,
      isExactPath: true, // Only match exact path
    },
  ]

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Generate</SidebarGroupLabel>
      <SidebarMenu>
        {generateItems.map((item) => (
          <SidebarMenuItem key={item.title}>
            <Link href={item.url} className="w-full" onClick={(e) => {
              // Always stop propagation to prevent sidebar expansion
              e.stopPropagation();
              // Prevent default behavior to avoid any browser-specific issues
              if (item.url === '#') {
                e.preventDefault();
              }
            }}>
              <SidebarMenuButton
                className={`${item.isExactPath ? 
                  (pathname === item.url ? "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground" : "") : 
                  (pathname.startsWith(item.url) && item.url !== '#' ? "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground" : "")}`}
              >
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
