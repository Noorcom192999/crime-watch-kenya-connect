
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, FileText, Calendar, Clock, MapPin, User } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const DigitalOccurrenceBook = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showNewReport, setShowNewReport] = useState(false);

  const mockReports = [
    {
      id: "OB/001/2024",
      type: "Theft",
      location: "Westlands, Nairobi",
      time: "2024-01-15 14:30",
      status: "Under Investigation",
      priority: "Medium",
      officer: "PC John Mwangi"
    },
    {
      id: "OB/002/2024", 
      type: "Assault",
      location: "CBD, Nairobi",
      time: "2024-01-15 16:45",
      status: "Resolved",
      priority: "High",
      officer: "Sgt Mary Wanjiku"
    },
    {
      id: "OB/003/2024",
      type: "Burglary",
      location: "Karen, Nairobi",
      time: "2024-01-16 09:15",
      status: "New",
      priority: "High",
      officer: "PC David Kipchoge"
    }
  ];

  const handleNewReport = () => {
    toast({
      title: "New Report Created",
      description: "OB/004/2024 has been successfully created and assigned.",
    });
    setShowNewReport(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "New": return "bg-blue-100 text-blue-800";
      case "Under Investigation": return "bg-yellow-100 text-yellow-800";
      case "Resolved": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "bg-red-100 text-red-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "Low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

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
                <Select>
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
                <Select>
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
                <Input id="location" placeholder="Enter incident location" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="date-time">Date & Time</Label>
                <Input id="date-time" type="datetime-local" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="complainant">Complainant Name</Label>
                <Input id="complainant" placeholder="Enter complainant name" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact">Contact Information</Label>
                <Input id="contact" placeholder="Phone number or email" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Incident Description</Label>
              <Textarea 
                id="description" 
                placeholder="Provide detailed description of the incident"
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="evidence">Evidence & Witnesses</Label>
              <Textarea 
                id="evidence" 
                placeholder="List any evidence collected and witness information"
                rows={3}
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={handleNewReport} className="flex-1">
                <FileText className="h-4 w-4 mr-2" />
                Create OB Entry
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
                <SelectItem value="investigating">Under Investigation</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* OB Entries List */}
      <div className="space-y-4">
        {mockReports.map((report) => (
          <Card key={report.id} className="hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div className="space-y-3 flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold text-lg">{report.id}</h3>
                    <Badge className={getStatusColor(report.status)}>
                      {report.status}
                    </Badge>
                    <Badge className={getPriorityColor(report.priority)}>
                      {report.priority} Priority
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-gray-500" />
                      <span className="font-medium">Type:</span>
                      <span>{report.type}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <span className="font-medium">Location:</span>
                      <span>{report.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span className="font-medium">Time:</span>
                      <span>{report.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-gray-500" />
                      <span className="font-medium">Officer:</span>
                      <span>{report.officer}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm">View Details</Button>
                  <Button variant="outline" size="sm">Update Status</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DigitalOccurrenceBook;
