
import { CrimeIncident } from './types';

export const processCrimeTypeData = (incidents: CrimeIncident[]) => {
  const typeMap = new Map<string, number>();
  
  incidents.forEach(incident => {
    const type = incident.type || 'Other';
    typeMap.set(type, (typeMap.get(type) || 0) + 1);
  });

  const total = incidents.length;
  const colors = ['#3b82f6', '#ef4444', '#f59e0b', '#10b981', '#8b5cf6', '#6b7280'];
  
  return Array.from(typeMap.entries())
    .sort(([,a], [,b]) => b - a)
    .slice(0, 6)
    .map(([type, count], index) => ({
      type: type.replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      count,
      percentage: Math.round((count / total) * 100),
      color: colors[index] || '#6b7280'
    }));
};
