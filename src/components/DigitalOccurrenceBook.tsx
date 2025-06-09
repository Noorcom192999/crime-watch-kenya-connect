
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, FileText, Calendar, Clock, MapPin, User } from "lucide-react";
import { useOccurrenceBook, type OccurrenceBookEntry } from "@/hooks/useOccurrenceBook";
import { usePoliceStations } from "@/hooks/usePoliceStations";

const DigitalOccurrenceBook = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showNewReport, setShowNewReport] = useState(false);
  const [entries, setEntries] = useState<OccurrenceBookEntry[]>([]);
  const [formData, setFormData] = useState({
    incident_type: "",
    priority_level: "medium" as "low" | "medium" | "high",
    location: "",
    incident_datetime: "",
    complainant_name: "",
    complainant_contact: "",
    description: "",
    evidence_collected: "",
    witnesses_info: ""
  });

  const { loading, createEntry, fetchEntries, updateEntryStatus } = useOccurrenceBook();
  const { stations } = usePoliceStations();

  useEffect(() => {
    loadEntries();
  }, []);

  const loadEntries = async () => {
    const result = await fetchEntries();
    if (result.success && result.data) {
      setEntries(result.data);
    }
  };

  const handleNewReport = async () => {
    if (!formData.incident_type || !formData.location || !formData.description || !formData.incident_datetime) {
      return;
    }

    // For demo purposes, using the first station and a mock officer ID
    const stationId = stations[0]?.id;
    const mockOfficerId = "mock-officer-id"; // In real app, this would come from authentication

    if (!stationId) {
      return;
    }

    const result = await createEntry({
      ...formData,
      station_id: stationId,
      created_by_officer_id: mockOfficerId
    });

    if (result.success) {
      setShowNewReport(false);
      setFormData({
        incident_type: "",
        priority_level: "medium",
        location: "",
        incident_datetime: "",
        complainant_name: "",
        complainant_contact: "",
        description: "",
        evidence_collected: "",
        witnesses_info: ""
      });
      loadEntries();
    }
  };

  const handleStatusUpdate = async (id: string, newStatus: string) => {
    const result = await updateEntryStatus(id, newStatus);
    if (result.success) {
      loadEntries();
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new": return "bg-blue-100 text-blue-800";
      case "under_investigation": return "bg-yellow-100 text-yellow-800";
      case "resolved": return "bg-green-100 text-green-800";
      case "closed": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const formatStatus = (status: string) => {
    return status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const filteredEntries = entries.filter(entry =>
    entry.ob_number?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.incident_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.officers?.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.officers?.last_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (showNewReport) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">New Occurrence Book Entry</h2>
          <Button variant="outline" onClick={() => setShowNewReport(false)}>
            Back to OB List
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Create New OB Entry</CardTitle>
            <CardDescription>Fill in the details for the new occurrence book entry</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="incident-type">Incident Type</Label>
                <Select value={formData.incident_type} onValueChange={(value) => setFormData({...formData, incident_type: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select incident type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="theft">Theft</SelectItem>
                    <SelectItem value="assault">Assault</SelectItem>
                    <SelectItem value="burglary">Burglary</SelectItem>
                    <SelectItem value="robbery">Robbery</SelectItem>
                    <SelectItem value="fraud">Fraud</SelectItem>
                    <SelectItem value="vandalism">Vandalism</SelectItem>
                    <SelectItem value="domestic-violence">Domestic Violence</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="priority">Priority Level</Label>
                <Select value={formData.priority_level} onValueChange={(value: "low" | "medium" | "high") => setFormData({...formData, priority_level: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input 
                  id="location" 
                  placeholder="Enter incident location" 
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="date-time">Date & Time</Label>
                <Input 
                  id="date-time" 
                  type="datetime-local" 
                  value={formData.incident_datetime}
                  onChange={(e) => setFormData({...formData, incident_datetime: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="complainant">Complainant Name</Label>
                <Input 
                  id="complainant" 
                  placeholder="Enter complainant name" 
                  value={formData.complainant_name}
                  onChange={(e) => setFormData({...formData, complainant_name: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact">Contact Information</Label>
                <Input 
                  id="contact" 
                  placeholder="Phone number or email" 
                  value={formData.complainant_contact}
                  onChange={(e) => setFormData({...formData, complainant_contact: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Incident Description</Label>
              <Textarea 
                id="description" 
                placeholder="Provide detailed description of the incident"
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="evidence">Evidence & Witnesses</Label>
              <Textarea 
                id="evidence" 
                placeholder="List any evidence collected and witness information"
                rows={3}
                value={formData.evidence_collected + (formData.witnesses_info ? '\n\nWitnesses:\n' + formData.witnesses_info : '')}
                onChange={(e) => {
                  const text = e.target.value;
                  const witnessIndex = text.indexOf('\n\nWitnesses:\n');
                  if (witnessIndex > -1) {
                    setFormData({
                      ...formData, 
                      evidence_collected: text.substring(0, witnessIndex),
                      witnesses_info: text.substring(witnessIndex + 13)
                    });
                  } else {
                    setFormData({...formData, evidence_collected: text, witnesses_info: ""});
                  }
                }}
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={handleNewReport} className="flex-1" disabled={loading}>
                <FileText className="h-4 w-4 mr-2" />
                {loading ? "Creating..." : "Create OB Entry"}
              </Button>
              <Button variant="outline" onClick={() => setShowNewReport(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Digital Occurrence Book</h2>
        <Button onClick={() => setShowNewReport(true)}>
          <Plus className="h-4 w-4 mr-2" />
          New OB Entry
        </Button>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by OB number, type, location, or officer..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Filter by Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="under_investigation">Under Investigation</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* OB Entries List */}
      <div className="space-y-4">
        {loading ? (
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-muted-foreground">Loading OB entries...</p>
            </CardContent>
          </Card>
        ) : filteredEntries.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-muted-foreground">No OB entries found.</p>
            </CardContent>
          </Card>
        ) : (
          filteredEntries.map((entry) => (
            <Card key={entry.id} className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-3 flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold text-lg">{entry.ob_number}</h3>
                      <Badge className={getStatusColor(entry.status || 'new')}>
                        {formatStatus(entry.status || 'new')}
                      </Badge>
                      <Badge className={getPriorityColor(entry.priority_level)}>
                        {entry.priority_level} Priority
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-gray-500" />
                        <span className="font-medium">Type:</span>
                        <span>{entry.incident_type}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        <span className="font-medium">Location:</span>
                        <span>{entry.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span className="font-medium">Time:</span>
                        <span>{new Date(entry.incident_datetime).toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-gray-500" />
                        <span className="font-medium">Officer:</span>
                        <span>{entry.officers ? `${entry.officers.first_name} ${entry.officers.last_name}` : 'Unassigned'}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">View Details</Button>
                    <Select onValueChange={(value) => handleStatusUpdate(entry.id!, value)}>
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Update Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">New</SelectItem>
                        <SelectItem value="under_investigation">Under Investigation</SelectItem>
                        <SelectItem value="resolved">Resolved</SelectItem>
                        <SelectItem value="closed">Closed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default DigitalOccurrenceBook;
