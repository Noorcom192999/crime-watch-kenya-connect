
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { toast } from '@/hooks/use-toast';
import { CrimeAnalyticsData } from '@/utils/analytics/types';
import { processAnalyticsData } from '@/utils/analytics/dataProcessor';

export const useCrimeAnalytics = () => {
  const [analyticsData, setAnalyticsData] = useState<CrimeAnalyticsData | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchCrimeAnalytics = async () => {
    setLoading(true);
    try {
      // Fetch crime reports data
      const { data: crimeReports, error: reportsError } = await supabase
        .from('crime_reports')
        .select(`
          *,
          assigned_station:police_stations(name, county)
        `)
        .order('created_at', { ascending: false });

      if (reportsError) throw reportsError;

      // Fetch OB entries data
      const { data: obEntries, error: obError } = await supabase
        .from('occurrence_book_entries')
        .select(`
          *,
          station:police_stations(name, county)
        `)
        .order('created_at', { ascending: false });

      if (obError) throw obError;

      // Process the data for analytics
      const processedData = processAnalyticsData(crimeReports || [], obEntries || []);
      setAnalyticsData(processedData);

      return { success: true, data: processedData };
    } catch (error: any) {
      console.error('Error fetching crime analytics:', error);
      toast({
        title: "Error",
        description: "Failed to fetch crime analytics data",
        variant: "destructive",
      });
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCrimeAnalytics();
  }, []);

  return {
    analyticsData,
    loading,
    fetchCrimeAnalytics
  };
};
