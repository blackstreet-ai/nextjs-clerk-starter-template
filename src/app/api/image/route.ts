import { fal } from '@ai-sdk/fal';
import { experimental_generateImage as generateImage } from 'ai';
import { NextRequest, NextResponse } from 'next/server';

// Use Node.js runtime
export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {

    // Parse request body
    const { prompt, model = 'fal-ai/fast-sdxl', size = '1024x1024' } = await req.json();

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }

    // Generate image
    const { image } = await generateImage({
      model: fal.image(model),
      prompt,
      size,
    });

    // Return the image as base64
    return NextResponse.json({
      imageUrl: `data:image/png;base64,${Buffer.from(image.uint8Array).toString('base64')}`,
    });
  } catch (error) {
    console.error('Error generating image:', error);
    return NextResponse.json(
      { error: 'Failed to generate image' },
      { status: 500 }
    );
  }
}
