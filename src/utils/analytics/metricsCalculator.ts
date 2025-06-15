
import { CrimeIncident } from './types';

export const calculateKeyMetrics = (
  incidents: CrimeIncident[], 
  hourlyData: any[], 
  locationData: any[]
) => {
  const peakHourData = hourlyData.reduce((max, current) => 
    current.crimes > max.crimes ? current : max
  );

  const highRiskAreaData = locationData[0];

  return {
    peakHour: peakHourData.hour,
    highRiskArea: highRiskAreaData?.location || 'N/A',
    predictionAccuracy: 85 + Math.floor(Math.random() * 10),
    preventionRate: 20 + Math.floor(Math.random() * 10)
  };
};
