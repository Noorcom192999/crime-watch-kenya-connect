
export interface CrimeAnalyticsData {
  hourlyData: Array<{
    hour: string;
    crimes: number;
    predictions: number;
  }>;
  crimeTypeData: Array<{
    type: string;
    count: number;
    percentage: number;
    color: string;
  }>;
  locationData: Array<{
    location: string;
    crimes: number;
    trend: string;
  }>;
  keyMetrics: {
    peakHour: string;
    highRiskArea: string;
    predictionAccuracy: number;
    preventionRate: number;
  };
  predictions: Array<{
    type: string;
    time: string;
    confidence: string;
    area: string;
    crimes: string[];
  }>;
}

export interface CrimeIncident {
  type: string;
  location: string;
  county: string;
  created_at: string;
  time: string;
  report_category?: 'morning' | 'evening' | 'anytime' | 'monthly';
  info_level?: 'Z' | 'O' | 'P' | 'R';
}
