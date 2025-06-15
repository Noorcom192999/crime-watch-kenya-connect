import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { toast } from '@/hooks/use-toast';

export interface CrimeReport {
  id?: string;
  report_id?: string;
  report_type: 'incident' | 'tip';
  incident_type: string;
  urgency_level: 'emergency' | 'urgent' | 'routine';
  description: string;
  location_address: string;
  location_latitude?: number;
  location_longitude?: number;
  incident_date?: string;
  incident_time?: string;
  status?: string;
  priority?: string;
  is_anonymous: boolean;
  reporter_name?: string;
  reporter_contact?: string;
  assigned_station_id?: string;
  evidence_description?: string;
  witnesses_info?: string;
  created_at?: string;
  updated_at?: string;
  report_category?: 'morning' | 'evening' | 'anytime' | 'monthly';
  info_level?: 'Z' | 'O' | 'P' | 'R';
}

export const useCrimeReports = () => {
  const [loading, setLoading] = useState(false);

  const submitReport = async (reportData: CrimeReport) => {
    setLoading(true);
    try {
      // First get the generated report ID
      const { data: reportId, error: idError } = await supabase
        .rpc('generate_report_id');

      if (idError) throw idError;

      // Submit the report with the generated ID
      const { data, error } = await supabase
        .from('crime_reports')
        .insert([{
          report_id: reportId,
          report_type: reportData.report_type,
          incident_type: reportData.incident_type,
          urgency_level: reportData.urgency_level,
          description: reportData.description,
          location_address: reportData.location_address,
          location_latitude: reportData.location_latitude,
          location_longitude: reportData.location_longitude,
          incident_date: reportData.incident_date,
          incident_time: reportData.incident_time,
          is_anonymous: reportData.is_anonymous,
          reporter_name: reportData.is_anonymous ? null : reportData.reporter_name,
          reporter_contact: reportData.is_anonymous ? null : reportData.reporter_contact,
          evidence_description: reportData.evidence_description,
          witnesses_info: reportData.witnesses_info,
          report_category: reportData.report_category || 'anytime',
          info_level: reportData.info_level || 'R'
        }])
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Report Submitted Successfully",
        description: `Your report ID is ${reportId}. You will receive SMS updates.`,
      });

      return { success: true, reportId, data };
    } catch (error: any) {
      console.error('Error submitting report:', error);
      toast({
        title: "Submission Failed",
        description: error.message || "Failed to submit report. Please try again.",
        variant: "destructive",
      });
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  const fetchReports = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('crime_reports')
        .select(`
          *,
          police_stations (
            name,
            address
          )
        `)
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;
      return { success: true, data };
    } catch (error: any) {
      console.error('Error fetching reports:', error);
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  const trackReport = async (reportId: string) => {
    try {
      const { data, error } = await supabase
        .from('crime_reports')
        .select(`
          *,
          police_stations (
            name,
            address,
            phone
          ),
          officers (
            first_name,
            last_name,
            rank
          )
        `)
        .eq('report_id', reportId)
        .single();

      if (error) throw error;
      return { success: true, data };
    } catch (error: any) {
      console.error('Error tracking report:', error);
      return { success: false, error };
    }
  };

  return {
    loading,
    submitReport,
    fetchReports,
    trackReport
  };
};
