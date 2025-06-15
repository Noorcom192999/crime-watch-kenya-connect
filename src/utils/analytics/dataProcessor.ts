
import { CrimeAnalyticsData, CrimeIncident } from './types';
import { processHourlyData } from './hourlyProcessor';
import { processCrimeTypeData } from './crimeTypeProcessor';
import { processLocationData } from './locationProcessor';
import { calculateKeyMetrics } from './metricsCalculator';
import { generatePredictions } from './predictionsGenerator';

export const processAnalyticsData = (crimeReports: any[], obEntries: any[]): CrimeAnalyticsData => {
  // Combine all incidents
  const allIncidents: CrimeIncident[] = [
    ...crimeReports.map(r => ({
      type: r.incident_type,
      location: r.assigned_station?.name || 'Unknown',
      county: r.assigned_station?.county || 'Unknown',
      created_at: r.created_at,
      time: r.incident_time || '00:00:00'
    })),
    ...obEntries.map(o => ({
      type: o.incident_type,
      location: o.station?.name || 'Unknown',
      county: o.station?.county || 'Unknown',
      created_at: o.created_at,
      time: o.incident_datetime ? new Date(o.incident_datetime).toTimeString().slice(0, 8) : '00:00:00'
    }))
  ];

  // Process all data components
  const hourlyData = processHourlyData(allIncidents);
  const crimeTypeData = processCrimeTypeData(allIncidents);
  const locationData = processLocationData(allIncidents);
  const keyMetrics = calculateKeyMetrics(allIncidents, hourlyData, locationData);
  const predictions = generatePredictions(allIncidents);

  return {
    hourlyData,
    crimeTypeData,
    locationData,
    keyMetrics,
    predictions
  };
};
