import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    // For demo purposes, we'll fetch the first user
    const user = await prisma.user.findFirst();
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch profile' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const imageUrl = formData.get('imageUrl') as string;

    // For demo purposes, we'll update the first user
    const user = await prisma.user.upsert({
      where: { id: 1 },
      update: {
        name,
        email,
        ...(imageUrl && { imageUrl }),
      },
      create: {
        name,
        email,
        imageUrl: imageUrl || '',
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update profile' },
      { status: 500 }
    );
  }
} 