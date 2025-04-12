"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Skeleton } from "./ui/skeleton";
import { toast } from "sonner";

// Define the image type
interface GeneratedImage {
  id: string;
  url: string;
  prompt: string;
  model: string;
  size: string;
  createdAt: string;
}

export function ImageGallery() {
  const [images, setImages] = useState<GeneratedImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load images from local storage
  const loadImages = () => {
    try {
      const savedImages = JSON.parse(localStorage.getItem("generatedImages") || "[]");
      setImages(savedImages);
    } catch (error) {
      console.error("Error loading images:", error);
      toast.error("Failed to load saved images");
    } finally {
      setIsLoading(false);
    }
  };

  // Listen for new images
  useEffect(() => {
    // Initial load
    loadImages();

    // Listen for new images
    const handleImageGenerated = () => {
      loadImages();
    };

    window.addEventListener("imageGenerated", handleImageGenerated);

    return () => {
      window.removeEventListener("imageGenerated", handleImageGenerated);
    };
  }, []);

  // Delete an image
  const handleDeleteImage = (id: string) => {
    try {
      const updatedImages = images.filter((image) => image.id !== id);
      localStorage.setItem("generatedImages", JSON.stringify(updatedImages));
      setImages(updatedImages);
      toast.success("Image deleted");
    } catch (error) {
      console.error("Error deleting image:", error);
      toast.error("Failed to delete image");
    }
  };

  // Clear all images
  const handleClearAll = () => {
    try {
      localStorage.removeItem("generatedImages");
      setImages([]);
      toast.success("All images cleared");
    } catch (error) {
      console.error("Error clearing images:", error);
      toast.error("Failed to clear images");
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Gallery</CardTitle>
        {images.length > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleClearAll}
          >
            Clear All
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-[200px] w-full rounded-md" />
            <Skeleton className="h-[200px] w-full rounded-md" />
          </div>
        ) : images.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <p className="text-muted-foreground">No images generated yet</p>
            <p className="text-muted-foreground text-sm mt-1">
              Use the form to generate your first image
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {images.map((image) => (
              <div key={image.id} className="space-y-2">
                <div className="relative group rounded-md overflow-hidden">
                  <Image
                    src={image.url}
                    alt={image.prompt}
                    width={1024}
                    height={1024}
                    className="w-full h-auto object-cover rounded-md"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteImage(image.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium line-clamp-2">{image.prompt}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(image.createdAt).toLocaleString()}
                  </p>
                </div>
                <Separator className="my-2" />
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
