"use client";

import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import Image from "next/image";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { toast } from "sonner";

// Define the available models
const MODELS = [
  { id: "fal-ai/fast-sdxl", name: "Fast SDXL" },
  { id: "fal-ai/flux-lora", name: "Flux LoRA" },
  { id: "fal-ai/flux-pro/v1.1-ultra", name: "Flux Pro Ultra" },
  { id: "fal-ai/ideogram/v2", name: "Ideogram v2" },
  { id: "fal-ai/recraft-v3", name: "Recraft v3" },
  { id: "fal-ai/stable-diffusion-3.5-large", name: "SD 3.5 Large" },
  { id: "fal-ai/hyper-sdxl", name: "Hyper SDXL" },
];

// Define the available sizes
const SIZES = [
  { id: "1024x1024", name: "1:1 - Square (1024x1024)" },
  { id: "1792x1024", name: "16:9 - Landscape (1792x1024)" },
  { id: "1024x1792", name: "9:16 - Portrait (1024x1792)" },
  { id: "1365x1024", name: "4:3 - Landscape (1365x1024)" },
  { id: "1024x1365", name: "3:4 - Portrait (1024x1365)" },
  { id: "1280x800", name: "16:10 - Landscape (1280x800)" },
  { id: "800x1280", name: "10:16 - Portrait (800x1280)" },
  { id: "2560x1080", name: "21:9 - Landscape (2560x1080)" },
  { id: "1080x2560", name: "9:21 - Portrait (1080x2560)" },
];

export function ImageGenerationForm() {
  const [prompt, setPrompt] = useState("");
  const [model, setModel] = useState("fal-ai/fast-sdxl");
  const [size, setSize] = useState("1024x1024");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!prompt.trim()) {
      toast.error("Please enter a prompt");
      return;
    }

    try {
      setIsGenerating(true);
      setGeneratedImage(null);
      
      const response = await fetch("/api/image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
          model,
          size,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to generate image");
      }

      const data = await response.json();
      const imageUrl = data.imageUrl;
      setGeneratedImage(imageUrl);
      
      // Add to local storage for gallery
      const savedImages = JSON.parse(localStorage.getItem("generatedImages") || "[]");
      const newImage = {
        id: Date.now().toString(),
        url: imageUrl,
        prompt,
        model,
        size,
        createdAt: new Date().toISOString(),
      };
      
      localStorage.setItem("generatedImages", JSON.stringify([newImage, ...savedImages]));
      
      // Dispatch event for gallery to update
      window.dispatchEvent(new CustomEvent("imageGenerated"));
      
      toast.success("Image generated successfully");
    } catch (error) {
      console.error("Error generating image:", error);
      toast.error(error instanceof Error ? error.message : "Failed to generate image");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Generate Image</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="prompt">Prompt</Label>
            <Textarea
              id="prompt"
              placeholder="A serene mountain landscape at sunset"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="min-h-[100px] resize-y"
              disabled={isGenerating}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="model">Model</Label>
            <Select
              value={model}
              onValueChange={setModel}
              disabled={isGenerating}
            >
              <SelectTrigger id="model">
                <SelectValue placeholder="Select a model" />
              </SelectTrigger>
              <SelectContent>
                {MODELS.map((model) => (
                  <SelectItem key={model.id} value={model.id}>
                    {model.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="size">Size</Label>
            <Select
              value={size}
              onValueChange={setSize}
              disabled={isGenerating}
            >
              <SelectTrigger id="size">
                <SelectValue placeholder="Select a size" />
              </SelectTrigger>
              <SelectContent>
                {SIZES.map((size) => (
                  <SelectItem key={size.id} value={size.id}>
                    {size.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <Button
            type="submit"
            className="w-full"
            disabled={isGenerating || !prompt.trim()}
          >
            {isGenerating ? "Generating..." : "Generate Image"}
          </Button>
        </form>
      </CardContent>
      {generatedImage && (
        <CardFooter className="flex flex-col">
          <div className="w-full rounded-md overflow-hidden mt-4">
            <Image
              src={generatedImage}
              alt={prompt}
              width={1024}
              height={1024}
              className="w-full h-auto object-contain"
              unoptimized
            />
          </div>
        </CardFooter>
      )}
    </Card>
  );
}
