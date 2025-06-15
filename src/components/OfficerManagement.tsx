
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Users, Plus, Search, Star, Shield, Phone, Mail } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { toast } from "@/hooks/use-toast";
import { KENYA_POLICE_RANKS, getRankAbbreviation, getRankHierarchy, getSupervisionLevel } from "@/utils/policeRanks";

interface Officer {
  id: string;
  service_number: string;
  first_name: string;
  last_name: string;
  rank: string;
  station_id: string;
  phone?: string;
  email?: string;
  is_active: boolean;
  police_stations?: {
    name: string;
    county: string;
  };
}

const OfficerManagement = () => {
  const [officers, setOfficers] = useState<Officer[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRank, setFilterRank] = useState<string>('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const fetchOfficers = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('officers')
        .select(`
          *,
          police_stations (
            name,
            county
          )
        `)
        .order('service_number', { ascending: true });

      if (filterRank !== 'all') {
        query = query.eq('rank', filterRank);
      }

      const { data, error } = await query;

      if (error) throw error;
      setOfficers(data || []);
    } catch (error: any) {
      console.error('Error fetching officers:', error);
      toast({
        title: "Error",
        description: "Failed to fetch officers data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOfficers();
  }, [filterRank]);

  const filteredOfficers = officers.filter(officer =>
    `${officer.first_name} ${officer.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    officer.service_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    officer.rank.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRankBadgeColor = (rank: string) => {
    const hierarchy = getRankHierarchy(rank as any);
    if (hierarchy <= 3) return "default";
    if (hierarchy <= 6) return "secondary";
    if (hierarchy <= 9) return "outline";
    return "destructive";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Officer Management</h2>
          <p className="text-gray-600">Manage Kenya Police Service personnel and rankings</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Officer
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Officer</DialogTitle>
              <DialogDescription>
                Enter officer details with proper Kenya Police Service rank
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" placeholder="Enter first name" />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" placeholder="Enter last name" />
                </div>
              </div>
              <div>
                <Label htmlFor="serviceNumber">Service Number</Label>
                <Input id="serviceNumber" placeholder="e.g., PC001234" />
              </div>
              <div>
                <Label htmlFor="rank">Rank</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select rank" />
                  </SelectTrigger>
                  <SelectContent>
                    {KENYA_POLICE_RANKS.map((rank) => (
                      <SelectItem key={rank} value={rank}>
                        {getRankAbbreviation(rank)} - {rank}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2 pt-4">
                <Button className="flex-1">Add Officer</Button>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <div className="flex gap-4 items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search officers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={filterRank} onValueChange={setFilterRank}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Ranks</SelectItem>
            {KENYA_POLICE_RANKS.map((rank) => (
              <SelectItem key={rank} value={rank}>
                {getRankAbbreviation(rank)} - {rank}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button onClick={fetchOfficers} disabled={loading}>
          <Users className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Officers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredOfficers.map((officer) => (
          <Card key={officer.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-blue-600" />
                  <div>
                    <CardTitle className="text-lg">
                      {officer.first_name} {officer.last_name}
                    </CardTitle>
                    <CardDescription>{officer.service_number}</CardDescription>
                  </div>
                </div>
                <Badge variant={getRankBadgeColor(officer.rank)}>
                  {getRankAbbreviation(officer.rank)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="font-semibold text-sm text-gray-600">Rank</p>
                <p className="font-medium">{officer.rank}</p>
                <p className="text-xs text-gray-500">{getSupervisionLevel(officer.rank as any)}</p>
              </div>
              
              <div>
                <p className="font-semibold text-sm text-gray-600">Station</p>
                <p className="font-medium">{officer.police_stations?.name || 'Not Assigned'}</p>
                <p className="text-xs text-gray-500">{officer.police_stations?.county}</p>
              </div>

              {officer.phone && (
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-3 w-3 text-gray-400" />
                  <span>{officer.phone}</span>
                </div>
              )}

              {officer.email && (
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-3 w-3 text-gray-400" />
                  <span className="truncate">{officer.email}</span>
                </div>
              )}

              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 text-yellow-500" />
                  <span className="text-xs text-gray-500">
                    Level {getRankHierarchy(officer.rank as any)}
                  </span>
                </div>
                <Badge variant={officer.is_active ? "default" : "secondary"}>
                  {officer.is_active ? "Active" : "Inactive"}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredOfficers.length === 0 && !loading && (
        <Card>
          <CardContent className="text-center py-12">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">No Officers Found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default OfficerManagement;

