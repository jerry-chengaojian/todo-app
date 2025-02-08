import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';
import { homedir } from 'os';
import fs from 'fs/promises';

const UPLOAD_DIR = path.join(homedir(), 'profile-uploads');

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const image = formData.get('image') as File | null;

    if (!image) {
      return NextResponse.json(
        { error: 'No image provided' },
        { status: 400 }
      );
    }

    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Create upload directory if it doesn't exist
    await fs.mkdir(UPLOAD_DIR, { recursive: true });
    
    // Save the file
    const filename = `${Date.now()}-${image.name}`;
    const filepath = path.join(UPLOAD_DIR, filename);
    await writeFile(filepath, buffer);
    
    return NextResponse.json({ 
      imageUrl: `/api/images/${filename}` 
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to upload image' },
      { status: 500 }
    );
  }
} 