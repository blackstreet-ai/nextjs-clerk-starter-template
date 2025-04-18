import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ImageGenerationForm } from "@/components/image-generation-form";
import { ImageGallery } from "@/components/image-gallery";

export default function ImageGenerationPage() {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <div className="px-4 lg:px-6">
                <h1 className="text-2xl font-bold tracking-tight">Image Generation</h1>
                <p className="text-muted-foreground mt-2">
                  Generate images using AI with the FAL SDK
                </p>
              </div>
              <div className="px-4 lg:px-6">
                <div className="grid gap-6 md:grid-cols-[1fr_1fr] lg:grid-cols-[1.5fr_1fr]">
                  <ImageGenerationForm />
                  <ImageGallery />
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
