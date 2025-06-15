import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { toast } from '@/hooks/use-toast';

export interface OccurrenceBookEntry {
  id?: string;
  ob_number?: string;
  station_id: string;
  incident_type: string;
  priority_level: 'low' | 'medium' | 'high';
  location: string;
  incident_datetime: string;
  complainant_name?: string;
  complainant_contact?: string;
  description: string;
  evidence_collected?: string;
  witnesses_info?: string;
  status?: 'new' | 'under_investigation' | 'resolved' | 'closed';
  investigating_officer_id?: string;
  created_by_officer_id: string;
  created_at?: string;
  updated_at?: string;
  police_stations?: {
    name: string;
    address: string;
  };
  officers?: {
    first_name: string;
    last_name: string;
    rank: string;
  };
  report_category?: 'morning' | 'evening' | 'anytime' | 'monthly';
  info_level?: 'Z' | 'O' | 'P' | 'R';
}

export const useOccurrenceBook = () => {
  const [loading, setLoading] = useState(false);

  const createEntry = async (entryData: OccurrenceBookEntry) => {
    setLoading(true);
    try {
      // Generate OB number using the database function
      const { data: obNumber, error: obError } = await supabase
        .rpc('generate_ob_number', { station_id_param: entryData.station_id });

      if (obError) throw obError;

      // Create the OB entry
      const { data, error } = await supabase
        .from('occurrence_book_entries')
        .insert([{
          ob_number: obNumber,
          station_id: entryData.station_id,
          incident_type: entryData.incident_type,
          priority_level: entryData.priority_level,
          location: entryData.location,
          incident_datetime: entryData.incident_datetime,
          complainant_name: entryData.complainant_name,
          complainant_contact: entryData.complainant_contact,
          description: entryData.description,
          evidence_collected: entryData.evidence_collected,
          witnesses_info: entryData.witnesses_info,
          report_category: entryData.report_category || 'anytime',
          info_level: entryData.info_level || 'R',
          created_by_officer_id: entryData.created_by_officer_id
        }])
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "OB Entry Created Successfully",
        description: `OB Number: ${obNumber}`,
      });

      return { success: true, obNumber, data };
    } catch (error: any) {
      console.error('Error creating OB entry:', error);
      toast({
        title: "Creation Failed",
        description: error.message || "Failed to create OB entry. Please try again.",
        variant: "destructive",
      });
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  const fetchEntries = async (stationId?: string) => {
    setLoading(true);
    try {
      let query = supabase
        .from('occurrence_book_entries')
        .select(`
          *,
          police_stations (
            name,
            address
          ),
          officers (
            first_name,
            last_name,
            rank
          )
        `)
        .order('created_at', { ascending: false });

      if (stationId) {
        query = query.eq('station_id', stationId);
      }

      const { data, error } = await query;

      if (error) throw error;
      return { success: true, data };
    } catch (error: any) {
      console.error('Error fetching OB entries:', error);
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  const updateEntryStatus = async (id: string, status: string, notes?: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('occurrence_book_entries')
        .update({ 
          status,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Status Updated",
        description: `OB entry status updated to ${status}`,
      });

      return { success: true, data };
    } catch (error: any) {
      console.error('Error updating OB entry status:', error);
      toast({
        title: "Update Failed",
        description: error.message || "Failed to update status. Please try again.",
        variant: "destructive",
      });
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    createEntry,
    fetchEntries,
    updateEntryStatus
  };
};
