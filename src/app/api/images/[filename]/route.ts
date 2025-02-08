import { NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import { homedir } from 'os';
import path from 'path';
import { headers } from 'next/headers';

const UPLOAD_DIR = path.join(homedir(), 'profile-uploads');

export async function GET(
  request: Request,
  { params }: { params: { filename: string } }
) {
  try {
    const filename = params.filename;
    const filepath = path.join(UPLOAD_DIR, filename);

    // Read the file
    const file = await readFile(filepath);

    // Get file extension
    const ext = path.extname(filename).toLowerCase();
    
    // Set content type based on file extension
    const contentType = {
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.gif': 'image/gif',
      '.webp': 'image/webp',
    }[ext] || 'application/octet-stream';

    // Return the image with proper headers
    return new NextResponse(file, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000',
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Image not found' },
      { status: 404 }
    );
  }
} 