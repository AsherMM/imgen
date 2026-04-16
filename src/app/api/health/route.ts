import { NextResponse } from 'next/server';
import { db } from '@/src/lib/db';

export async function GET() {
  try {
    // Test DB connection
    const userCount = await db.user.count();
    
    return NextResponse.json({
      status: 'ok',
      database: 'connected',
      userCount,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: 'error',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}