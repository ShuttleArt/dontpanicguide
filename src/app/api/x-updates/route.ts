// src/app/api/x-updates/route.ts
import { NextResponse } from 'next/server'

// This forces the route to run on every request (no static render) – perfect for live X data
export const dynamic = 'force-dynamic'

export async function GET() {
  // Temporary static data – later we’ll replace with real X fetch
  const latestPosts = [
    {
      id: '1',
      content: 'Deployment of 29 @Starlink satellites confirmed',
      date: '2025-11-22',
      type: 'starlink',
    },
    {
      id: '2',
      content: 'Falcon 9 completes its 150th launch of 2025',
      date: '2025-11-22',
      type: 'launch',
    },
    {
      id: '3',
      content: 'The Starbase team plans to have the next Super Heavy booster stacked in December',
      date: '2025-11-22',
      type: 'milestone',
    },
  ]

  return NextResponse.json({ posts: latestPosts, updated: new Date().toISOString() })
}