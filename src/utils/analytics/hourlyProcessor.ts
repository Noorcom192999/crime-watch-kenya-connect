
import { CrimeIncident } from './types';

export const processHourlyData = (incidents: CrimeIncident[]) => {
  const hourlyMap = new Map<string, number>();
  
  // Initialize all hours
  for (let i = 0; i < 24; i += 3) {
    const hour = `${i.toString().padStart(2, '0')}:00`;
    hourlyMap.set(hour, 0);
  }

  incidents.forEach(incident => {
    const hour = Math.floor(parseInt(incident.time.split(':')[0]) / 3) * 3;
    const hourKey = `${hour.toString().padStart(2, '0')}:00`;
    hourlyMap.set(hourKey, (hourlyMap.get(hourKey) || 0) + 1);
  });

  return Array.from(hourlyMap.entries()).map(([hour, crimes]) => ({
    hour,
    crimes,
    predictions: Math.round(crimes * (0.9 + Math.random() * 0.2)) // Mock predictions
  }));
};
