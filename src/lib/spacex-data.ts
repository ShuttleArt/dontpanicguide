// src/lib/space-data.ts

export interface SpaceXData {
  launchesByYear: Record<number, number>;
  payloadByYear: Record<number, number>; // tons, rounded estimate
  starlinkSats: number;
  totalLaunches: number;
  maxReuses: number;
}

const CURRENT_YEAR = new Date().getFullYear();

// Hardcoded pre-2025 (successful orbital launches)
const HISTORICAL_LAUNCHES: Record<number, number> = {
  2010: 2, 2012: 1, 2013: 3, 2014: 6, 2015: 7,
  2016: 8, 2017: 18, 2018: 21, 2019: 13, 2020: 26, 2021: 31, 2022: 61, 2023: 96, 2024: 134,
};

const HISTORICAL_PAYLOAD: Record<number, number> = {
  2013: 4, 2014: 11, 2015: 30, 2016: 27, 2017: 88, 2018: 130, 2019: 137,
  2020: 240, 2021: 385, 2022: 1250, 2023: 1300, 2024: 1600,
};

const HISTORICAL_TOTAL_UP_TO_2024 = 428; // Pre-2025 successful

export async function getSpaceXData(): Promise<SpaceXData> {
  // Accurate Dec 23, 2025 – manual bump monthly
  const currentYearLaunches = 165; // All Falcon 9
  const currentYearPayloadTons = 2700; // ~16t avg x 165

  const launchesByYear = { ...HISTORICAL_LAUNCHES, [CURRENT_YEAR]: currentYearLaunches };
  const payloadByYear = { ...HISTORICAL_PAYLOAD, [CURRENT_YEAR]: currentYearPayloadTons };

  const starlinkSats = 9357; // Launched – latest reliable

  const totalLaunches = HISTORICAL_TOTAL_UP_TO_2024 + currentYearLaunches;

  return {
    launchesByYear,
    payloadByYear,
    starlinkSats,
    totalLaunches,
    maxReuses: 32, // B1067 record
  };
}
