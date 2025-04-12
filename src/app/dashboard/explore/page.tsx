import { Metadata } from "next";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export const metadata: Metadata = {
  title: "Explore",
  description: "Explore content and features",
};

export default function ExplorePage() {
  return (
    <SidebarProvider
      style={{
        "--sidebar-width": "calc(var(--spacing) * 72)",
        "--header-height": "calc(var(--spacing) * 12)",
      } as React.CSSProperties}
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <div className="px-4 lg:px-6">
                <h1 className="text-2xl font-bold tracking-tight">Explore</h1>
                <p className="text-muted-foreground mt-2">
                  Discover new content and features
                </p>
              </div>
              <div className="px-4 lg:px-6">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {/* Content will be added here */}
                  <div className="rounded-lg border bg-card p-6 shadow-sm">
                    <h3 className="text-lg font-semibold">Coming Soon</h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      New content will be available here soon.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
