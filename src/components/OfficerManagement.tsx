
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { KENYA_POLICE_RANKS, PoliceRank } from "@/utils/policeRanks";
import RankStatistics from "@/components/analytics/RankStatistics";
import { OfficerForm } from "@/components/officer-management/OfficerForm";
import { OfficerStatistics } from "@/components/officer-management/OfficerStatistics";
import { OfficerFilters } from "@/components/officer-management/OfficerFilters";
import { OfficersList } from "@/components/officer-management/OfficersList";

interface Officer {
  id: string;
  badge_number: string;
  full_name: string;
  rank: PoliceRank;
  station_id: string;
  phone: string;
  email: string;
  status: 'active' | 'inactive' | 'suspended';
  date_joined: string;
  created_at: string;
  station?: {
    name: string;
    county: string;
  };
}

type OfficerFormData = {
  badge_number: string;
  full_name: string;
  rank: PoliceRank;
  station_id: string;
  phone: string;
  email: string;
  status: 'active' | 'inactive' | 'suspended';
};

const OfficerManagement = () => {
  const [officers, setOfficers] = useState<Officer[]>([]);
  const [stations, setStations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRank, setFilterRank] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingOfficer, setEditingOfficer] = useState<Officer | null>(null);

  useEffect(() => {
    fetchOfficers();
    fetchStations();
  }, []);

  const fetchOfficers = async () => {
    try {
      const { data, error } = await supabase
        .from('officers')
        .select(`
          *,
          station:police_stations(name, county)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOfficers(data || []);
    } catch (error: any) {
      console.error('Error fetching officers:', error);
      toast({
        title: "Error",
        description: "Failed to fetch officers",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchStations = async () => {
    try {
      const { data, error } = await supabase
        .from('police_stations')
        .select('id, name, county')
        .order('name');

      if (error) throw error;
      setStations(data || []);
    } catch (error: any) {
      console.error('Error fetching stations:', error);
    }
  };

  const onSubmit = async (data: OfficerFormData) => {
    try {
      if (editingOfficer) {
        const { error } = await supabase
          .from('officers')
          .update(data)
          .eq('id', editingOfficer.id);

        if (error) throw error;
        toast({
          title: "Success",
          description: "Officer updated successfully",
        });
      } else {
        const { error } = await supabase
          .from('officers')
          .insert([data]);

        if (error) throw error;
        toast({
          title: "Success", 
          description: "Officer added successfully",
        });
      }
      
      setIsDialogOpen(false);
      setEditingOfficer(null);
      fetchOfficers();
    } catch (error: any) {
      console.error('Error saving officer:', error);
      toast({
        title: "Error",
        description: "Failed to save officer",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (officer: Officer) => {
    setEditingOfficer(officer);
    setIsDialogOpen(true);
  };

  const handleReset = () => {
    setEditingOfficer(null);
  };

  const filteredOfficers = officers.filter(officer => {
    const matchesSearch = officer.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         officer.badge_number.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRank = filterRank === "all" || officer.rank === filterRank;
    const matchesStatus = filterStatus === "all" || officer.status === filterStatus;
    return matchesSearch && matchesRank && matchesStatus;
  });

  const rankStatistics = KENYA_POLICE_RANKS.map(rank => {
    const count = officers.filter(o => o.rank === rank).length;
    const activeCount = officers.filter(o => o.rank === rank && o.status === 'active').length;
    return {
      rank,
      count,
      activeCount,
      percentage: officers.length > 0 ? Math.round((count / officers.length) * 100) : 0,
    };
  }).filter(stat => stat.count > 0);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Officer Management</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="pt-6">
                <div className="h-20 bg-gray-200 rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Officer Management</h2>
          <p className="text-gray-600">Manage Kenya Police Service personnel</p>
        </div>
        <OfficerForm 
          isOpen={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          editingOfficer={editingOfficer}
          stations={stations}
          onSubmit={onSubmit}
          onReset={handleReset}
        />
      </div>

      <OfficerStatistics officers={officers} />

      <RankStatistics officerData={rankStatistics} />

      <Card>
        <CardHeader>
          <CardTitle>Officers Directory</CardTitle>
          <CardDescription>Search and manage police officers</CardDescription>
        </CardHeader>
        <CardContent>
          <OfficerFilters 
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            filterRank={filterRank}
            onRankFilterChange={setFilterRank}
            filterStatus={filterStatus}
            onStatusFilterChange={setFilterStatus}
          />
          <OfficersList officers={filteredOfficers} onEdit={handleEdit} />
        </CardContent>
      </Card>
    </div>
  );
};

export default OfficerManagement;
