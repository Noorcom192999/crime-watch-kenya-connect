
import { CrimeIncident } from './types';

export const processLocationData = (incidents: CrimeIncident[]) => {
  const locationMap = new Map<string, number>();
  
  incidents.forEach(incident => {
    const location = incident.location || 'Unknown';
    locationMap.set(location, (locationMap.get(location) || 0) + 1);
  });

  return Array.from(locationMap.entries())
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5)
    .map(([location, crimes]) => ({
      location,
      crimes,
      trend: `${Math.random() > 0.5 ? '+' : '-'}${Math.floor(Math.random() * 20)}%`
    }));
};
