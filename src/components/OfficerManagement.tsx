import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { Search, Plus, Edit, Shield, UserCheck, Users, Star, TrendingUp } from "lucide-react";
import { KENYA_POLICE_RANKS, PoliceRank, getRankAbbreviation, getSupervisionLevel } from "@/utils/policeRanks";
import RankStatistics from "@/components/analytics/RankStatistics";

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

const officerSchema = z.object({
  badge_number: z.string().min(1, "Badge number is required"),
  full_name: z.string().min(1, "Full name is required"),
  rank: z.enum([...KENYA_POLICE_RANKS]),
  station_id: z.string().min(1, "Station is required"),
  phone: z.string().min(1, "Phone number is required"),
  email: z.string().email("Valid email is required"),
  status: z.enum(['active', 'inactive', 'suspended']),
});

type OfficerFormData = z.infer<typeof officerSchema>;

const OfficerManagement = () => {
  const [officers, setOfficers] = useState<Officer[]>([]);
  const [stations, setStations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRank, setFilterRank] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingOfficer, setEditingOfficer] = useState<Officer | null>(null);

  const form = useForm<OfficerFormData>({
    resolver: zodResolver(officerSchema),
    defaultValues: {
      badge_number: "",
      full_name: "",
      rank: "Constable",
      station_id: "",
      phone: "",
      email: "",
      status: "active",
    },
  });

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
      form.reset();
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
    form.reset({
      badge_number: officer.badge_number,
      full_name: officer.full_name,
      rank: officer.rank,
      station_id: officer.station_id,
      phone: officer.phone,
      email: officer.email,
      status: officer.status,
    });
    setIsDialogOpen(true);
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
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => { setEditingOfficer(null); form.reset(); }}>
              <Plus className="h-4 w-4 mr-2" />
              Add Officer
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>{editingOfficer ? 'Edit Officer' : 'Add New Officer'}</DialogTitle>
              <DialogDescription>
                {editingOfficer ? 'Update officer information' : 'Add a new officer to the system'}
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="badge_number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Badge Number</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="full_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="rank"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Rank</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {KENYA_POLICE_RANKS.map((rank) => (
                            <SelectItem key={rank} value={rank}>
                              {rank}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="station_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Station</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {stations.map((station) => (
                            <SelectItem key={station.id} value={station.id}>
                              {station.name} - {station.county}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input {...field} type="email" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                          <SelectItem value="suspended">Suspended</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  {editingOfficer ? 'Update Officer' : 'Add Officer'}
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Statistics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Officers</p>
                <p className="text-2xl font-bold">{officers.length}</p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Officers</p>
                <p className="text-2xl font-bold text-green-600">
                  {officers.filter(o => o.status === 'active').length}
                </p>
              </div>
              <UserCheck className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Stations Covered</p>
                <p className="text-2xl font-bold">
                  {new Set(officers.map(o => o.station_id)).size}
                </p>
              </div>
              <Shield className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Senior Officers</p>
                <p className="text-2xl font-bold">
                  {officers.filter(o => 
                    ['Inspector-General of Police', 'Deputy Inspector-General', 'Senior Assistant Inspector-General', 'Assistant Inspector-General'].includes(o.rank)
                  ).length}
                </p>
              </div>
              <Star className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Rank Statistics */}
      <RankStatistics officerData={rankStatistics} />

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Officers Directory</CardTitle>
          <CardDescription>Search and manage police officers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by name or badge number..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filterRank} onValueChange={setFilterRank}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by rank" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Ranks</SelectItem>
                {KENYA_POLICE_RANKS.map((rank) => (
                  <SelectItem key={rank} value={rank}>
                    {rank}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Officers List */}
          <div className="space-y-4">
            {filteredOfficers.map((officer) => (
              <div key={officer.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Shield className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{officer.full_name}</h4>
                      <p className="text-sm text-gray-600">
                        {officer.rank} • Badge: {officer.badge_number}
                      </p>
                      <p className="text-sm text-gray-500">
                        {officer.station?.name}, {officer.station?.county}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant={officer.status === 'active' ? 'default' : 
                              officer.status === 'suspended' ? 'destructive' : 'secondary'}
                    >
                      {officer.status}
                    </Badge>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(officer)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            {filteredOfficers.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No officers found matching your search criteria.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OfficerManagement;
