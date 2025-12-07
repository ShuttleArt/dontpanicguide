import { NextResponse } from 'next/server';
import { getSpaceXData } from '@/lib/spacex-data'; // Your data function
// Import your DB or cache if needed, e.g., import db from '@/lib/db';

export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization');
  if (authHeader !== 'Bearer ValSev25!') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = await getSpaceXData(); // Run your data fetch
    // Example: Update DB or cache – swap this with your logic
    // await db.updateData(data); // e.g., Prisma or whatever
    console.log('Cron job ran: Updated SpaceX data at', new Date().toISOString());
    return NextResponse.json({ status: 'success', data });
  } catch (error) {
    console.log('Cron error:', error);
    return NextResponse.json({ status: 'error' }, { status: 500 });
  }
}