# FAL Image Generation Setup

This document explains how to set up the FAL image generation feature in this Next.js application.

## Environment Variables

Create a `.env.local` file in the root of your project with the following variables:

```
# FAL API Key for image generation
FAL_API_KEY=your_fal_api_key_here
```

You can obtain a FAL API key by signing up at [fal.ai](https://fal.ai/).

## Available Models

The following FAL models are available for image generation:

- `fal-ai/fast-sdxl`: High-speed SDXL model optimized for quick inference with up to 4x faster speeds
- `fal-ai/flux-lora`: Super fast endpoint for the FLUX.1 [dev] model with LoRA support
- `fal-ai/flux-pro/v1.1-ultra`: Professional-grade image generation with up to 2K resolution
- `fal-ai/ideogram/v2`: Specialized for high-quality posters and logos with exceptional typography
- `fal-ai/recraft-v3`: SOTA in image generation with vector art and brand style capabilities
- `fal-ai/stable-diffusion-3.5-large`: Advanced MMDiT model with improved typography
- `fal-ai/hyper-sdxl`: Performance-optimized SDXL variant with enhanced creative capabilities

## Supported Aspect Ratios

The following aspect ratios are supported:

- 1:1 (square HD)
- 16:9 (landscape)
- 9:16 (portrait)
- 4:3 (landscape)
- 3:4 (portrait)
- 16:10 (1280x800)
- 10:16 (800x1280)
- 21:9 (2560x1080)
- 9:21 (1080x2560)
