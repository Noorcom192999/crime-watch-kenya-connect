
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { toast } from '@/hooks/use-toast';

export interface EvidenceItem {
  id: string;
  evidence_id: string;
  case_id: string;
  type: string;
  description: string;
  location: string;
  collected_by: string;
  date_collected: string;
  status: string;
  blockchain_hash?: string;
  integrity_status: string;
  created_at?: string;
  updated_at?: string;
}

export interface CaseFile {
  id: string;
  case_id: string;
  title: string;
  lead_officer: string;
  status: string;
  evidence_count: number;
  last_updated: string;
  priority: string;
  created_at?: string;
}

export const useEvidence = () => {
  const [evidenceItems, setEvidenceItems] = useState<EvidenceItem[]>([]);
  const [caseFiles, setCaseFiles] = useState<CaseFile[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchEvidenceItems = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('evidence_items')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setEvidenceItems(data || []);
      return { success: true, data };
    } catch (error: any) {
      console.error('Error fetching evidence items:', error);
      toast({
        title: "Error",
        description: "Failed to fetch evidence items",
        variant: "destructive",
      });
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  const fetchCaseFiles = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('case_files')
        .select(`
          *,
          evidence_count:evidence_items(count)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCaseFiles(data || []);
      return { success: true, data };
    } catch (error: any) {
      console.error('Error fetching case files:', error);
      toast({
        title: "Error",
        description: "Failed to fetch case files",
        variant: "destructive",
      });
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  const addEvidenceItem = async (evidence: Omit<EvidenceItem, 'id' | 'evidence_id' | 'created_at' | 'updated_at'>) => {
    setLoading(true);
    try {
      // Generate evidence ID
      const { data: evidenceId, error: idError } = await supabase
        .rpc('generate_evidence_id');

      if (idError) throw idError;

      const { data, error } = await supabase
        .from('evidence_items')
        .insert([{
          evidence_id: evidenceId,
          ...evidence,
          blockchain_hash: `0x${Math.random().toString(16).substr(2, 16)}...`,
          integrity_status: 'Verified'
        }])
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Success",
        description: `Evidence item ${evidenceId} added successfully`,
      });

      fetchEvidenceItems();
      return { success: true, data };
    } catch (error: any) {
      console.error('Error adding evidence item:', error);
      toast({
        title: "Error",
        description: "Failed to add evidence item",
        variant: "destructive",
      });
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvidenceItems();
    fetchCaseFiles();
  }, []);

  return {
    evidenceItems,
    caseFiles,
    loading,
    fetchEvidenceItems,
    fetchCaseFiles,
    addEvidenceItem
  };
};
