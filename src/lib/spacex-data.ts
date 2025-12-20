// src/lib/space-data.ts

import { NextFetchRequestConfig } from 'next/server';

export interface SpaceXData {
  launchesByYear: Record<number, number>;
  payloadByYear: Record<number, number>; // tons, rounded
  starlinkSats: number;
  totalLaunches: number;
  maxReuses: number;
}

const revalidateConfig: NextFetchRequestConfig = { revalidate: 3600 };

const CURRENT_YEAR = new Date().getFullYear();

const HISTORICAL_LAUNCHES: Record<number, number> = {
  2006: 0, 2007: 0, 2008: 0, 2009: 1, 2010: 2, 2012: 1, 2013: 3, 2014: 6, 2015: 7,
  2016: 8, 2017: 18, 2018: 21, 2019: 13, 2020: 26, 2021: 31, 2022: 61, 2023: 96, 2024: 134,
};

const HISTORICAL_PAYLOAD: Record<number, number> = {
  2013: 4, 2014: 11, 2015: 30, 2016: 27, 2017: 88, 2018: 130, 2019: 137,
  2020: 240, 2021: 385, 2022: 1250, 2023: 1300, 2024: 1600,
};

const HISTORICAL_TOTAL_LAUNCHES_UP_TO_2024 = 428;

export async function getSpaceXData(): Promise<SpaceXData> {
  // Hardcode 2025 for accuracy (165 successful as Dec 20 – bump if more)
  const currentYearLaunches = 165;
  const currentYearPayloadTons = 2723; // Rounded 16.5t avg x 165

  const launchesByYear = { ...HISTORICAL_LAUNCHES, [CURRENT_YEAR]: currentYearLaunches };
  const payloadByYear = { ...HISTORICAL_PAYLOAD, [CURRENT_YEAR]: currentYearPayloadTons };

  let starlinkSats = 10900;
  try {
    const res = await fetch('https://planet4589.org/space/con/star/stats.txt', { next: revalidateConfig });
    if (res.ok) {
      const text = await res.text();
      const match = text.match(/Launched\s*:\s*(\d+)/i);
      if (match) starlinkSats = parseInt(match[1], 10);
    }
  } catch (e) {
    console.warn('Starlink fetch failed');
  }

  const totalLaunches = HISTORICAL_TOTAL_LAUNCHES_UP_TO_2024 + currentYearLaunches;

  return {
    launchesByYear,
    payloadByYear,
    starlinkSats,
    totalLaunches,
    maxReuses: 32,
  };
}